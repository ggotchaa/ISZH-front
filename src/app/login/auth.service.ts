import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { XmlSignService } from './xmlsign.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import moment from 'moment';
import { Router } from '@angular/router';


interface Body {
  grantType: string;
  username?: string;
  password: string;
  xml?: string;
}

interface AuthResult {
  idToken: string;
  expiresIn: number;
  body: Body;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private _isLoggedIn = new BehaviorSubject<boolean>(this.getIsLoggedIn());

  // Expose the observable$ part of the _isLoggedIn subject (read only stream)
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private xmlSignService: XmlSignService, private message: NzNotificationService, private router: Router,) {}

  login(username?: string, password?: string): Observable<AuthResult> {
    const body = {
      grantType: "password",
      username: username,
      password: password
    };
    return this.http.post<AuthResult>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay(),
      );
  }

  loginECPPwd(password: string, xml: string): Observable<AuthResult> {
    const body = {
      grantType: 'sign_password',
      password: password,
      xml: xml
    };
    return this.http.post<AuthResult>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay(),
      );
  }

  private setSession(authResult: AuthResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    // Update the loggedIn status
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    // Update the loggedIn status
    this._isLoggedIn.next(false);
    this.router.navigate(["/"]);
  }

  getIsLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.getIsLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || 'null');
    return moment(expiresAt);
  }

  loginWithDigitalSignature = () => {
    const webSocket = new WebSocket('wss://127.0.0.1:13579/');
    const xml = '<xml><login><iin></iin></login></xml>';
    const signXml = {
      module: 'kz.gov.pki.knca.commonUtils',
      method: 'signXml',
      args: ['PKCS12', 'AUTHENTICATION', xml, '', ''],
    };
    webSocket.onopen = () => webSocket.send(JSON.stringify(signXml));
    webSocket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      if (result !== null && result.code === '200') {
        this.xmlSignService.setXmlSign(result.responseObject);
      }
    };

    webSocket.onclose = (event) => {
      if (event.wasClean) {
      } else {
        this.message.error(
          'NCA Layer не запущен',
          'Запустите NCA Layer и попробуйте снова'
        );
      }
      return null;
    };
  };
}

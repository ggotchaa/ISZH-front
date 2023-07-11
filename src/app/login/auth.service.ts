import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { XmlSignService } from './xmlsign.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  constructor(private http: HttpClient, private xmlSignService: XmlSignService) {}

  login(username?: string, password?: string): Observable<any> {
    const body = {
      grantType: "password",
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // loginWithDigitalSignature(password: string, xml: string): Observable<any> {
  //   const body = {
  //     grantType: 'sign_password',
  //     password: password,
  //     xml: xml
  //   };
  //   return this.http.post(`${this.apiUrl}/login`, body);
  // }

  loginECPPwd(password: string, xml: string): Observable<any> {
    const body = {
      grantType: 'sign_password',
      password: password,
      xml: xml
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
    // this.http.post(`${this.apiUrl}/login`, data, {
    //   observe: 'response',
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // });

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
        // this.message.error(
        //   'NCA Layer не запущен',
        //   'Запустите NCA Layer и попробуйте снова'
        // );
      }
      return null;
    };
  };
}
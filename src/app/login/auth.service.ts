import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  constructor(private http: HttpClient) {}

  login(username?: string, password?: string): Observable<any> {
    const body = {
      grantType: 'password',
      username: username,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  loginWithDigitalSignature(password: string, xml: string): Observable<any> {
    const body = {
      grantType: 'sign_password',
      password: password,
      xml: xml
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}

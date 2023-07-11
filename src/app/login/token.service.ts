import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class TokenService {
  token: BehaviorSubject<any>;

  constructor() {
    this.token = new BehaviorSubject<any>({});
  }

  getToken(): Observable<any> {
    return this.token.asObservable();
  }

  setSetToken(value: any) {
    this.token.next(value);
  }
}

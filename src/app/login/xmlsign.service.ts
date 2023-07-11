import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class XmlSignService {
  xmlSign: BehaviorSubject<any>;

  constructor() {
    this.xmlSign = new BehaviorSubject<any>({});
  }

  getXmlSign(): Observable<any> {
    return this.xmlSign.asObservable();
  }

  setXmlSign(value: any) {
    this.xmlSign.next(value);
  }
}

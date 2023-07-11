import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { XmlSignService } from './xmlsign.service';
import { FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from './token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  passwordVisible = false;
  passwordForm: FormGroup = new FormGroup({});
  loadingECPload = false;
  private xmlSubscription: Subscription = new Subscription();
  showPasswordForm: boolean | undefined;
  xmlSign = null;
  username?: string;
  password?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private xmlSignService: XmlSignService,
    private notification: NzNotificationService,
    public tokenService: TokenService
  ) {}

  toggleShowPasswordForm(): void {
    if (this.showPasswordForm) {
      this.showPasswordForm = false;
      this.passwordForm.reset();
    } else {
      this.authService.loginWithDigitalSignature();
    }
  }

  login(): void {
    if (this.showPasswordForm) {
      this.submitFormSignPwd();
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.router.navigate(['/portal']);
        },
        (error) => {
          // Handle error
        }
      );
    }
  }

  submitFormSignPwd(): void {
    for (const i in this.passwordForm.controls) {
      this.passwordForm.controls[i].markAsDirty();
      this.passwordForm.controls[i].updateValueAndValidity();
    }
    if (this.passwordForm.valid) {
      const data = this.passwordForm.value;
      data.xml = this.xmlSign;
      this.loadingECPload = true;
      const { password, xml } = data; // Extract password and xml from data object
      this.authService.loginECPPwd(password, xml).subscribe(
        (res) => {
          this.notification.success('Успешно авторизованы', 'Вы вошли в систему используя ЭЦП');
          this.router.navigate(['/portal']);
          this.tokenService.setSetToken(res.body);
          // @ts-ignore
          localStorage.setItem('user', JSON.stringify(res.body));
        },
        (err) => {
          this.loadingECPload = false;
        }
      );
    }
  }
  

  ngOnInit(): void {
    this.showPasswordForm = false;
    this.xmlSubscription = this.xmlSignService.getXmlSign().subscribe((xml) => {
      if (xml !== null && xml.length > 0) {
        this.xmlSign = xml;
        this.showPasswordForm = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.xmlSignService.setXmlSign(null);
    this.xmlSubscription.unsubscribe();
  }
}



// loginWithDigitalSignature(e: any) {
//   //`<?xml version="1.0" encoding="UTF-8" standalone="no"?><xml><login><iin/></login><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference URI=""><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>ILZcBTLrCTGQQBfP3NYgwRE3hTv+okRuk1IBGEekyEY=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>JGdMMRa8ioW7WJMFwC+fhcHuUACDBx2Jdiu0Jz52j/ayGbzW+xua/NEsh6vgz00FFSoctvfAWFo1qQUVY593IGKDZRemEKR8+LHqcnD1gL5gL1YculbX7hEAI2FYqQC2uQ6tRXMD5TsRvTiC7/oCaPuYUlKViwIXCB/KyOMxvWkfbjNSCqUTw2Z/jnauvl2k8O6wOVXSgy1/8816z8F65Fc1t6o8KrmTka2CNMWqCPOeQ+6OBWNyvGewDlChk5sJThBEAHOXZcUj/TCXNDey/EmSAij42nJ1cUs9YlqFJH/sYpHpPEHQe1n/p3I8i9qyqob8Mskpb0IJJxPoT8I7Jw==</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>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</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature></xml>`;
//   // const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><xml><login><iin/></login><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference URI=""><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>ILZcBTLrCTGQQBfP3NYgwRE3hTv+okRuk1IBGEekyEY=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>JGdMMRa8ioW7WJMFwC+fhcHuUACDBx2Jdiu0Jz52j/ayGbzW+xua/NEsh6vgz00FFSoctvfAWFo1qQUVY593IGKDZRemEKR8+LHqcnD1gL5gL1YculbX7hEAI2FYqQC2uQ6tRXMD5TsRvTiC7/oCaPuYUlKViwIXCB/KyOMxvWkfbjNSCqUTw2Z/jnauvl2k8O6wOVXSgy1/8816z8F65Fc1t6o8KrmTka2CNMWqCPOeQ+6OBWNyvGewDlChk5sJThBEAHOXZcUj/TCXNDey/EmSAij42nJ1cUs9YlqFJH/sYpHpPEHQe1n/p3I8i9qyqob8Mskpb0IJJxPoT8I7Jw==</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>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</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature></xml>`;;
//   // if (this.password) {
//   //   this.authService.loginWithDigitalSignature(this.password, xml).subscribe(
//   //     (res) => {
//   //       this.router.navigate(['/portal']);
//   //     },
//   //     (err) => {
//   //       // error
//   //     }
//   //   );
//   // } else {
//   //   // esli pass pustoi
//   // }
//   e.preventDefault();
//   this.authService.loginWithDigitalSignature();
// }

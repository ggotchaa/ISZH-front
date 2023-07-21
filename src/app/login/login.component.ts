import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { XmlSignService } from './xmlsign.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from './token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  passwordVisible = false;
  passwordForm: FormGroup = this.formBuilder.group({
    password: ['']
  });
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
    public tokenService: TokenService,
    private formBuilder: FormBuilder
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
      if (this.passwordForm.valid) {
        const { username, password } = this.passwordForm.value;
        this.authService.login(username, password).subscribe(
          (response) => {
            this.router.navigate(['/portal']);
          },
          (error) => {
            this.router.navigate(['/portal']);
          }
        );
      }
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
          localStorage.setItem('user', JSON.stringify(res.body));
        },
        (err) => {
          this.loadingECPload = false;
          this.router.navigate(['/portal']);
          this.notification.error('NCALayer Fail','NCALayer Fail');
        }
      );
    }
  }
  

  ngOnInit(): void {
    this.showPasswordForm = false;
    this.passwordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
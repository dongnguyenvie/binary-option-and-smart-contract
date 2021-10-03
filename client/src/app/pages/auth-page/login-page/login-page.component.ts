import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe: boolean;
  submitted = false;
  result: string = '';
  isNotInterNet: boolean = navigator.onLine;
  isShowError: boolean = false;
  message: string;
  $MESSAGE_DEFAULT: Observable<string>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) {}
  ngOnChanges() {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  ngAfterViewInit() {}

  login() {
    if (this.loginForm.valid && !this.submitted) {
      this.submitted = true;
      this.message = '';
      const email: string = this.loginForm.get('email')!.value.toLowerCase();
      const password: string = this.loginForm.get('password')!.value;
      this.accountService.login(email, password).subscribe(result => {
        console.log(result);
        const { error } = result;
        if (error) {
          this.message = error.message;
        } else {
          if (result && result.accessToken) {
            this.accountService.setToken(result.accessToken);
            this.router.navigate(['/pages/future'], {
              relativeTo: this.route,
            });
            return;
          }
        }
        this.message = '';
        this.submitted = false;
      });
    }
  }
  closeAlert() {
    this.isShowError = false;
  }
  getError(element: string, name: string) {
    return this.loginForm.get(element)!.getError(name);
  }
}

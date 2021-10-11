import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/@core/services/account.service';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  rememberMe: boolean;
  submitted = false;
  result: string = '';
  isNotInterNet: boolean = navigator.onLine;
  isShowError: boolean = false;
  message: string;
  otpFormControl = new FormControl('');
  $accountSelected = this.walletConnectService.address;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private walletConnectService: WalletConnectService,
  ) {}
  ngOnChanges() {}
  ngOnInit() {
    this.registerForm = this.fb.group({
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

  register() {
    if (this.registerForm.valid && !this.submitted) {
      this.submitted = true;
      this.message = '';
      const email: string = this.registerForm.get('email')!.value.toLowerCase();
      const password: string = this.registerForm.get('password')!.value;
      const otp: string = this.otpFormControl.value;
      const walletId: string = this.walletConnectService.address.getValue();
      this.accountService
        .register(email, password, walletId, otp)
        .subscribe(result => {
          const { error, message } = result;
          if (error || message) {
            this.message = error?.message || message;
          } else {
            if (result) {
              this.router.navigate(['/auth/login'], {
                relativeTo: this.route,
              });
              return;
            }
          }
          this.submitted = false;
        });
    }
  }

  handleGetOtp() {}

  requestConnectMetamask() {
    this.walletConnectService.connectWallet();
  }

  changeAccountMetamask() {
    this.walletConnectService.connectWallet();
  }
  closeAlert() {
    this.isShowError = false;
  }
  getError(element: string, name: string) {
    return this.registerForm.get(element)!.getError(name);
  }
}

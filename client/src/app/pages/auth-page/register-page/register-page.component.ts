import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/@core/services/account.service';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
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
      this.isShowError = false;
      const email: string = this.registerForm.get('email')!.value.toLowerCase();
      const password: string = this.registerForm.get('password')!.value;
      this.accountService.register(email, password).subscribe(result => {
        console.log(result);
        this.submitted = false;
      });
    }
  }
  closeAlert() {
    this.isShowError = false;
  }
  getError(element: string, name: string) {
    return this.registerForm.get(element)!.getError(name);
  }
}

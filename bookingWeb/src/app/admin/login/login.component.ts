import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alert = false;
  userName = 'admin';
  password = 'admin';
  errs: string;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private service: AdminAuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get un() {
    return this.loginForm.get('username');
  }
  get pwd() {
    return this.loginForm.get('password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.service.logIn(this.loginForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigateByUrl('/Admin/Dashboard');
        },
        error: (err) => {
          this.errs = err?.error.message;
          this.alert = true;
        },
      });
    } else {
      this.validateAllFields(this.loginForm);
    }
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  closeAlert() {
    this.alert = false;
  }
}

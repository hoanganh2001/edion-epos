import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CardComponent } from '../../../shared/components/card/card.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup = {} as FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
    this.buildBasicForm();
    localStorage.clear();
  }

  buildBasicForm() {
    this.signinForm = this.fb.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }

  signin() {
    this.errorMessage = '';
    this.auth
      .login(
        this.signinForm.get('email')?.value,
        this.signinForm.get('password')?.value
      )
      .subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/image/add-image');
        },
        error: (err: string) => {
          this.errorMessage = err;
        },
      });
  }
}

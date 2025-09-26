import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from './auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(Auth)
  private router = inject(Router)

  propEmail = new FormControl('eve.holt@reqres.in', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })
  propPass = new FormControl('', {
    nonNullable: true
  })
  form = new FormGroup({
    email: this.propEmail,
    password: this.propPass
  })
  submitted = signal(false)

  login() {
    this.submitted.set(true)
    this.authService.login(this.form.value).subscribe(() => {
       this.router.navigateByUrl('/')
    })
  }
}

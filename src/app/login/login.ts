import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  propEmail = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  propPass = new FormControl('')
  form = new FormGroup({
    email: this.propEmail,
    password: this.propPass
  })
  submitted = signal(false)

  login() {
    console.log(this.form.value)
    this.submitted.set(true)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type LoginCredentials = {
  email?: string
  password?: string
}

export type LoginResponse = {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient)

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    credentials = {
      email: credentials.email?.trim(),
      password: credentials.password
    }
    return this.http.post<LoginResponse>('https://reqres.in/api/login', credentials, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
  }
}

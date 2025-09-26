import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Auth, LoginCredentials, LoginResponse } from './auth';

// class AuthMock {
//   login(credentials: LoginCredentials): Observable<LoginResponse> {
//     return of({ token: 'test' })
//   }
// }

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let el: HTMLElement
  let loginSpy = jasmine.createSpy('loginSpy').and.returnValue(of({ token: 'test' }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter(routes.filter(route => route.path == 'login')),
        provideHttpClient(),
        {
          provide: Auth,
          useValue: {
            login: loginSpy
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    el = fixture.nativeElement
    fixture.detectChanges();
  });

  it('Tester le router', async () => {
    const harness = await RouterTestingHarness.create()
    await harness.navigateByUrl('/login')
  })

  it('La validité/invalidité du champ email selon la saisie.', () => {
    const email =  component.propEmail
    email.setValue('')
    expect(email.valid).toBeFalse()
    expect(email.hasError('required')).toBeTrue()
  })

  it('Le comportement du champ password.', () => {
    const password = component.propPass
    expect(password.valid).toBeTrue()
  })

  describe('FormGroup', () => {
    it('La validité globale du formulaire. (invalid)', () => {
      component.form.setValue({
        email: '',
        password: ''
      })
      expect(component.form.valid).toBeFalse()
    })

    it('La validité globale du formulaire. (valid)', () => {
      component.form.setValue({
        email: 'aaaa@aaaa.net',
        password: ''
      })
      expect(component.form.valid).toBeTrue()
    })

    it('Que login() modifie bien l’état submitted.', () => {
      const router = TestBed.inject(Router)
      const spy = spyOn(router, 'navigateByUrl')
      expect(component.submitted()).toBeFalse()
      component.login()
      expect(spy).toHaveBeenCalled()
      expect(component.submitted()).toBeTrue()
    })

    it('Le bouton appelle login()', () => {
      const spy = spyOn(component, 'login')
      const formEl = el.querySelector('form')
      formEl?.dispatchEvent(new Event('submit'))
      fixture.detectChanges()
      expect(spy).toHaveBeenCalled()
    })
  })
});

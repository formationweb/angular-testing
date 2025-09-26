import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter(routes.filter(route => route.path == 'login'))
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
      expect(component.submitted()).toBeFalse()
      component.login()
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

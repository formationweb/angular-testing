import { firstValueFrom, lastValueFrom, take } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { Auth, LoginResponse } from './auth';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('Tester login(), requête POST', async () => {
     const credentials = {
       email: 'test@test.com',
       password: 'azerty'
     }

     const expectedRes = {
      token: 'test'
     }

     const resultSpy = jasmine.createSpy('resultSpy')

     service.login(credentials).subscribe(resultSpy)

     const req = httpMock.expectOne('https://reqres.in/api/login')
     expect(req.request.method).toBe('POST')
     expect(req.request.body).toEqual(credentials)

     req.flush(expectedRes)

     expect(resultSpy).toHaveBeenCalledWith(expectedRes)
  });

  it('Tester login(), requête POST (401)', async () => {
    const credentials = {
      email: 'test@test.com',
      password: 'fake'
    }

    const errorResponse = {
      error: 'not authorized'
    }

    const errorSpy = jasmine.createSpy('errorSpy')

    service.login(credentials).subscribe({
      error: errorSpy
    })

    const req = httpMock.expectOne('https://reqres.in/api/login')

    req.flush(errorResponse, {
      status: 401,
      statusText: 'Pas autorisé !'
    })

    expect(errorSpy).toHaveBeenCalled()
 });
});

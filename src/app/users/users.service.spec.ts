import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('Auth', () => {
  let service: UsersService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('getAll', () => {
     const expectedRes = [
        {
          id: 1,
          name: 'test',
          email: 'test@test.com'
        }
      ]

     const resultSpy = jasmine.createSpy('resultSpy')

     service.getAll().subscribe(resultSpy)

     const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users')
     expect(req.request.method).toBe('GET')

     req.flush(expectedRes)

     expect(resultSpy).toHaveBeenCalledWith(expectedRes)
  });
});

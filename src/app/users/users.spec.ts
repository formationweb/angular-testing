import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Users } from './users';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { User } from '../core/interfaces/user';
import { provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class UsersServiceMock extends UsersService {
  override getAll(): Observable<any[]> {
    const users: any[] = [
      {
        id: 1,
        name: 'test',
        email: 'test@test.com'
      }
    ]
    this._users$.next(users)
    return of(users)
  }
  override createUser(payload: { name: string; email: string; }): Observable<User> {
    this._users$.next([ payload as any ])
    return of(payload as any)
  }
  override deleteUser(id: number): Observable<void> {
    return of()
  }
}

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  let componentEl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        provideHttpClient(),
        {
          provide: UsersService,
          useClass: UsersServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement
    fixture.detectChanges();
  });

  it('Vérifier que la liste affichée correspond bien aux utilisateurs du service à l’initialisation', () => {
      const li = componentEl.querySelectorAll('li')
      expect(li.length).toBe(1)
  });

  it('Vérifier qu’après un clic sur le bouton, la liste contient un utilisateur de plus et que le dernier est bien le fictif ajouté.', () => {
      const button = componentEl.querySelector('button[testCreateBtn]') as HTMLButtonElement
      button?.click()
      fixture.detectChanges()
      const li = componentEl.querySelectorAll('li')
      expect(li.length).toBe(1)
  })
});

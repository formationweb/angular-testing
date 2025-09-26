import { inject, Injectable } from '@angular/core';
import { User } from '../core/interfaces/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/users';
  protected _users$ = new BehaviorSubject<User[]>([]);
  users$ = this._users$.asObservable();

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
        this._users$.next(users);
      })
    );
  }

  createUser(payload: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(this.url, payload).pipe(
      tap((user) => {
        this._users$.next([...this._users$.value, user]);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      tap(() => {
        this._users$.next(this._users$.value.filter((user) => user.id != id));
      })
    );
  }
}

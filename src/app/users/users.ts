import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';
import { UserCard } from './user-card/user-card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [UserCard, AsyncPipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private usersService = inject(UsersService);
  users$ = this.usersService.users$

  constructor() {
    this.usersService.getAll().subscribe()
  }

  createUser() {
    this.usersService.createUser({
      name: 'test',
      email: 'dzdzdz'
    }).subscribe()
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe()
  }
}

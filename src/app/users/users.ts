import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-users',
  imports: [UserCard],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private usersService = inject(UsersService);
  users = this.usersService.getAll();

  createUser() {
    this.users.push({
      id: 11,
      name: 'test',
      username: 'sasa',
      email: 'dzdzdz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
  }
}

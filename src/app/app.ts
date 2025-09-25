import { Component, OnInit, signal } from '@angular/core';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  imports: [Users],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = signal('myapp');
}

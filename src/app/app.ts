import { Component, OnInit, signal } from '@angular/core';
import { Users } from './users/users';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [Users, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = signal('myapp');
}

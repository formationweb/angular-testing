import { Component, OnInit, signal } from '@angular/core';
import { Users } from './users/users';
import { Navbar } from "./navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = signal('myapp');
}

import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = signal('myapp');

 test() {
   this.title.set('nouveau titre')
 }
}

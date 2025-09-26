import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css'
})
export class UserEdit {
   private route = inject(ActivatedRoute)
   userId: number | null

   constructor() {
     this.userId = +this.route.snapshot.params['id']
   }
}

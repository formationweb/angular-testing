import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { ConfirmDirective } from '../../core/directives/confirm';

@Component({
  selector: 'app-user-card',
  imports: [ConfirmDirective],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input() user: User = {} as User
  @Output() onDelete = new EventEmitter<number>()
  //user = input({} as User)

  deleteUser() {
    this.onDelete.emit(this.user.id)
  }
}

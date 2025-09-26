import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  addItem(item: CartItem): void {
    const current = this.itemsSubject.value;

    this.itemsSubject.next([...current, item]);
  }

  clear(): void {
    this.itemsSubject.next([]);
  }
}

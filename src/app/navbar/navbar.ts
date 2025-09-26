import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, delay, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  userName = new FormControl()
  loading = false
  searchResults: any[] = []

  constructor() {
    this.userName.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((str: string) => {
        this.loading = true
        return this.performSearch(str)
      }),
      catchError(err => {
        console.log(err)
        this.loading = false
        throw err
      })
    )
    .subscribe({
      next: (val) => {
        this.loading = false
        this.searchResults = val
      },
      error: (err) => {}
    })
  }

  private performSearch(searchTerm: string) {
     const mockResults = [
      { id : 1, name: `${searchTerm} result 1` },
      { id : 2, name: `${searchTerm} result 2` }
     ]
     return of(mockResults).pipe(delay(500))
  }
}

import { BehaviorSubject, Observable } from "rxjs"

// const ob$ = new Observable((subscriber) => {
//     subscriber.next(Math.random())
// })

const ob$ = new BehaviorSubject()

ob$.next(Math.random())


ob$.subscribe(console.log)
ob$.subscribe(console.log)

ob$.next(Math.random())
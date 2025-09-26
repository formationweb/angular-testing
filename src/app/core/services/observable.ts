import { Injectable } from "@angular/core";
import { Observable, of, switchMap, timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ObsService {
    count() {
        // return new Observable((subscriber) => {
        //     subscriber.next(1)
        //     subscriber.next(2)
        //     subscriber.next(3)
        //     subscriber.complete()
        // })
        return timer(10000).pipe(
            switchMap(() => of('a', 'b', 'c'))
        )
    }
}
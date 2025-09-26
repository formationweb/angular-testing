import { fakeAsync, TestBed, tick } from "@angular/core/testing"
import { ObsService } from "./observable"
import { lastValueFrom, tap, toArray } from "rxjs"

describe('Tester le service observable', () => {
    let service: ObsService

    beforeEach(() => {
        service = new ObsService()
    //    TestBed.configureTestingModule({})
    //    service = TestBed.inject(ObsService)
    })

    it('Test Count', fakeAsync(() => {
        let result = []
        service.count().subscribe((val) => {
            result.push(val)
        })

        expect(result.length).toBe(0)

        tick(10000)

        expect(result.length).toBe(3)
    }))

    it('tester un timer', fakeAsync(() => {
        let value = 0

        setTimeout(() => {
            value = 42
        }, 1000)

        expect(value).toBe(0)

        tick(1000)

        expect(value).toBe(42)
    }))
})
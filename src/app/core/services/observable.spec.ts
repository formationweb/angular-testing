import { TestBed } from "@angular/core/testing"
import { ObsService } from "./observable"
import { lastValueFrom, tap, toArray } from "rxjs"

describe('Tester le service observable', () => {
    let service: ObsService

    beforeEach(() => {
        service = new ObsService()
    //    TestBed.configureTestingModule({})
    //    service = TestBed.inject(ObsService)
    })

    it('Test Count', async () => {
        const result = await lastValueFrom(service.count().pipe(toArray()))
        expect(result.length).toBe(3)
    })
})
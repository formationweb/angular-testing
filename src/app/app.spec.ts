import { ComponentFixture, TestBed } from "@angular/core/testing"
import { App } from "./app"

describe('Tester App', () => {
  let fixture: ComponentFixture<App>
  let component: App
  let componentEl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents()
    fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    component = fixture.componentInstance
    componentEl = fixture.nativeElement
  })

  it('myapp est bien h1', () => {
    const h1 = componentEl.querySelector('h1')
    expect(component.title()).toBe('myapp')
    expect(h1?.textContent).toContain(component.title())
  })
})
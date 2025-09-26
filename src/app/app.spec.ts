import { ComponentFixture, TestBed } from "@angular/core/testing"
import { App } from "./app"
import { DebugElement } from "@angular/core"
import { By } from "@angular/platform-browser"
import { provideRouter, Router } from "@angular/router"
import { RouterTestingHarness } from "@angular/router/testing"
import { Login } from "./login/login"
import { routes } from "./app.routes"

describe('Tester App', () => {
  let fixture: ComponentFixture<App>
  let component: App
  let componentEl: HTMLElement
  let componentDe: DebugElement
  let router: Router
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      
    }).compileComponents()
    fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    component = fixture.componentInstance
    componentEl = fixture.nativeElement
    componentDe = fixture.debugElement
  })

  it('myapp est bien h1', () => {
    // const h1De = componentDe.query(By.css('h1'))
    // expect(component.title()).toBe('myapp')
    // expect(h1De?.nativeElement.textContent).toContain(component.title())
    expect(component).toBeTruthy()
  })

 
})
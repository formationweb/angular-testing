import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let componentEl: HTMLElement
  let componentDe: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement
    componentDe = fixture.debugElement
    fixture.detectChanges();
  });

  it('Récupérer ngModel', () => {
    const inputDe = componentDe.query(By.directive(NgModel))
    const inputEl = inputDe.nativeElement as HTMLInputElement
    inputEl.value = 'test'
    inputEl.dispatchEvent(new Event('input'))
    const modelDir = inputDe.injector.get(NgModel)
    expect(modelDir.valid).toBe(true)

    inputEl.value = ''
    inputEl.dispatchEvent(new Event('input'))

    expect(modelDir.valid).toBe(false)
  });
});

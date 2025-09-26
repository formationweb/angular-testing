import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Navbar } from './navbar';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { of, switchMap } from 'rxjs';

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

  it('', () => {})

  // it('Récupérer ngModel', () => {
  //   const inputDe = componentDe.query(By.directive(NgModel))
  //   const inputEl = inputDe.nativeElement as HTMLInputElement
  //   inputEl.value = 'test'
  //   inputEl.dispatchEvent(new Event('input'))
  //   const modelDir = inputDe.injector.get(NgModel)
  //   expect(modelDir.valid).toBe(true)

  //   inputEl.value = ''
  //   inputEl.dispatchEvent(new Event('input'))

  //   expect(modelDir.valid).toBe(false)
  // });

  it('Debounce: une requête n’est envoyée qu’après d’inactivité.', fakeAsync(() => {
    const spy = spyOn(component as any, 'performSearch').and.returnValue(of(
      [
        {  id : 1, name: `test result 1` }
      ]
    ))
    
    component.userName.setValue('test')
    
    tick(499)

    expect(spy).not.toHaveBeenCalled()

    tick(1)

    expect(spy).toHaveBeenCalled()

  }))

  it('DistinctUntilChanged : saisir deux fois le même terme ne provoque qu’un seul appel au service.', fakeAsync(() => {
    const spy = spyOn(component as any, 'performSearch').and.returnValue(of(
      [
        {  id : 1, name: `test result 1` }
      ]
    ))

    component.userName.setValue('test')
    component.userName.setValue('test')
    component.userName.setValue('test')

    tick(500)

    expect(spy).toHaveBeenCalledTimes(1)
  }))

  it('catchError', fakeAsync(() => {
    spyOn(component as any, 'performSearch').and.returnValue(
        of(null).pipe(
          switchMap(() => {
            throw new Error('Simulated API error')
          })
        )
    )
    spyOn(console, 'log')

    component.userName.setValue('test')

    tick(500)

    expect(component.loading).toBe(false)
    expect(component.searchResults).toEqual([])
    expect(console.log).toHaveBeenCalledWith(jasmine.any(Error))
  }))
});

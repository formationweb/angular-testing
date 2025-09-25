import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDirective } from './confirm';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  template: ` <button [confirm]="msg" [confirmUsername]="userName">Action</button> `,
  imports: [ConfirmDirective],
})
class HostComponent {
    msg = 'test'
    userName = ''
}

describe('ConfirmDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: HTMLElement;
  let component: HostComponent;
  let componentDe: DebugElement
  let buttonDe: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    componentDe= fixture.debugElement
    el = fixture.nativeElement;
    fixture.detectChanges();
    buttonDe = componentDe.query(By.directive(ConfirmDirective))
  });

  it('Vérifier que la directive s’instancie correctement et peut être attachée à un élément.', () => {
    const confirmDir = buttonDe.injector.get(ConfirmDirective)
    expect(confirmDir).toBeTruthy()
  })

  it('Vérifier que la directive appelle window.confirm avec le message fourni en entrée (@Input confirm).', () => {
    const spy = spyOn(window, 'confirm').and.returnValue(true);
    const buttonEl = buttonDe.nativeElement as HTMLButtonElement
    buttonEl.click()
    expect(spy).toHaveBeenCalledWith('test ')
  })

  it('Vérifier que la directive utilise un message different lorsque confirmUsername est fourni.', () => {
    const spy = spyOn(window, 'confirm').and.returnValue(true);
    component.userName = 'ana'
    fixture.detectChanges()
    const buttonEl = buttonDe.nativeElement as HTMLButtonElement
    buttonEl.click()
    expect(spy).toHaveBeenCalledWith('test ana')
  })

  it('Vérifier que lorsque window.confirm retourne true, l’événement onConfirm est émis,', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const confirmDir = buttonDe.injector.get(ConfirmDirective)
    const spy = spyOn(confirmDir.onConfirm, 'emit')
    const buttonEl = buttonDe.nativeElement as HTMLButtonElement
    buttonEl.click()
    expect(spy).toHaveBeenCalled()
  })

  it('Vérifier que lorsque window.confirm retourne false, l’événement confirmed n’est pas émis,,', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const confirmDir = buttonDe.injector.get(ConfirmDirective)
    const spy = spyOn(confirmDir.onConfirm, 'emit')
    const buttonEl = buttonDe.nativeElement as HTMLButtonElement
    buttonEl.click()
    expect(spy).not.toHaveBeenCalled()
  })
});

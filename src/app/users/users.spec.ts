import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Users } from './users';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  let componentEl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement
    fixture.detectChanges();
  });

  it('Vérifier que la liste affichée correspond bien aux utilisateurs du service à l’initialisation', () => {
      const li = componentEl.querySelectorAll('li')
      expect(li.length).toBe(component.users.length)
  });

  it('Vérifier qu’après un clic sur le bouton, la liste contient un utilisateur de plus et que le dernier est bien le fictif ajouté.', () => {
      const nbUsers = component.users.length
      const button = componentEl.querySelector('button[testCreateBtn]') as HTMLButtonElement
      button?.click()
      fixture.detectChanges()
      const li = componentEl.querySelectorAll('li')
      expect(li.length).toBe(nbUsers+1)
  })
});

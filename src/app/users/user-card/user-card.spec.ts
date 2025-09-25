import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCard } from './user-card';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;
    el = fixture.nativeElement
    fixture.componentRef.setInput('user', {
      id: 11,
      name: 'test',
      username: 'sasa',
      email: 'dzdzdz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    })
    fixture.detectChanges();
  });

  it('vérifier que les données de l\'utilisateur sont identiques au infos dans le template', () => {
    const emailEl = el.querySelector('[testUserEmail]')
    const nameEl = el.querySelector('[testUserName]')
    expect(emailEl?.textContent).toBe(component.user.email)
    expect(nameEl?.textContent).toBe(component.user.name)
  });

  it('suppression emet un événement', () => {
   // let emitId = null as number | null
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(component.onDelete, 'emit')

    // onDelete.subscribe((id) => {
    //   emitId = id
    // })

    const buttonEl = el.querySelector('button[testDeleteBtn]') as HTMLButtonElement
    buttonEl.click()

    //expect(emitId).toBe(11)

    expect(spy).toHaveBeenCalledWith(11)
  })
});

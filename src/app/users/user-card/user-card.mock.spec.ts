import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks'
import { UserCard } from './user-card';
import { ConfirmDirective } from '../../core/directives/confirm';
import { UsersService } from '../users.service';
import { of } from 'rxjs';

describe('UserCard ngmock', () => {
  beforeEach(() => {
    return MockBuilder(UserCard).mock(ConfirmDirective)
  });

  beforeEach(() => {
    MockInstance(UsersService, () => {
        return {
            getAll: () => of([{
                id: 1,
                name: 'ana'
            }])
        } as any
    })
  })

  it('vérifier que les données de l\'utilisateur sont identiques au infos dans le template', () => {
    const fixture = MockRender(UserCard, {
        user: {
            email: 'test@test.net',
            name: 'ana'
        }
    })
    const component = fixture.componentInstance
    const el = fixture.nativeElement
    const emailEl = el.querySelector('[testUserEmail]')
    const nameEl = el.querySelector('[testUserName]')
    expect(emailEl?.textContent).toBe(component.user.email)
    expect(nameEl?.textContent).toBe(component.user.name)
  });

  it('suppression emet un événement', () => {
    const fixture = MockRender(UserCard, {
        user: {
            email: 'test@test.net',
            name: 'ana'
        },
    })
    const component = fixture.point.componentInstance
    const el = fixture.nativeElement
   
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(component.onDelete, 'emit')

    const buttonEl = el.querySelector('button[testDeleteBtn]') as HTMLButtonElement
    buttonEl.click()

    expect(spy).toHaveBeenCalled()
  })
});

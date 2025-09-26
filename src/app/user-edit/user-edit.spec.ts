import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEdit } from './user-edit';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideLocationMocks } from '@angular/common/testing';

describe('UserEdit', () => {
  let component: UserEdit;
  let fixture: ComponentFixture<UserEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEdit],
      providers: [
        provideRouter(routes.filter(route => route.path?.includes('user')))
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('vérifier route', async () => {
    const harness = await RouterTestingHarness.create()
    const component = await harness.navigateByUrl('/user/1', UserEdit)
    expect(component.userId).toBe(1)
  });
});

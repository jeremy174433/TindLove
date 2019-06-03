import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUsersPage } from './details-users.page';

describe('DetailsUsersPage', () => {
  let component: DetailsUsersPage;
  let fixture: ComponentFixture<DetailsUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserInfoDialogComponent } from './view-user-info-dialog.component';

describe('ViewEditUserInfoDialogComponent', () => {
  let component: ViewUserInfoDialogComponent;
  let fixture: ComponentFixture<ViewUserInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserInfoDialogComponent],
    });
    fixture = TestBed.createComponent(ViewUserInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

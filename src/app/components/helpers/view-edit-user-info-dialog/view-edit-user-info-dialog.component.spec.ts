import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditUserInfoDialogComponent } from './view-edit-user-info-dialog.component';

describe('ViewEditUserInfoDialogComponent', () => {
  let component: ViewEditUserInfoDialogComponent;
  let fixture: ComponentFixture<ViewEditUserInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditUserInfoDialogComponent]
    });
    fixture = TestBed.createComponent(ViewEditUserInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

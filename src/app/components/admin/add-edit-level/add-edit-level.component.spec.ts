import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLevelComponent } from './add-edit-level.component';

describe('AddEditLevelComponent', () => {
  let component: AddEditLevelComponent;
  let fixture: ComponentFixture<AddEditLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLevelComponent]
    });
    fixture = TestBed.createComponent(AddEditLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

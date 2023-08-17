import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNewWordComponent } from './bulk-add-new-words.component';

describe('AddEditNewWordComponent', () => {
  let component: AddEditNewWordComponent;
  let fixture: ComponentFixture<AddEditNewWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditNewWordComponent],
    });
    fixture = TestBed.createComponent(AddEditNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

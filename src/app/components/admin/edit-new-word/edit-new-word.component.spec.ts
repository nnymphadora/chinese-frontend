import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewWordComponent } from './edit-new-word.component';

describe('EditNewWordComponent', () => {
  let component: EditNewWordComponent;
  let fixture: ComponentFixture<EditNewWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNewWordComponent]
    });
    fixture = TestBed.createComponent(EditNewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

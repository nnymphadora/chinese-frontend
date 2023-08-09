import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordCardComponent } from './new-word-card.component';

describe('NewWordCardComponent', () => {
  let component: NewWordCardComponent;
  let fixture: ComponentFixture<NewWordCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWordCardComponent]
    });
    fixture = TestBed.createComponent(NewWordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

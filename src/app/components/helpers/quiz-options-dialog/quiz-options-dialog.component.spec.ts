import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOptionsDialogComponent } from './quiz-options-dialog.component';

describe('QuizOptionsDialogComponent', () => {
  let component: QuizOptionsDialogComponent;
  let fixture: ComponentFixture<QuizOptionsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizOptionsDialogComponent]
    });
    fixture = TestBed.createComponent(QuizOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

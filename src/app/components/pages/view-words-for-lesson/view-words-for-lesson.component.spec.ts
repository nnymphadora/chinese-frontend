import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWordsForLessonComponent } from './view-words-for-lesson.component';

describe('ViewWordsForLessonComponent', () => {
  let component: ViewWordsForLessonComponent;
  let fixture: ComponentFixture<ViewWordsForLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWordsForLessonComponent]
    });
    fixture = TestBed.createComponent(ViewWordsForLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

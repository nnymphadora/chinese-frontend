import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLessonComponent } from './view-lesson.component';

describe('ViewWordsForLessonComponent', () => {
  let component: ViewLessonComponent;
  let fixture: ComponentFixture<ViewLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLessonComponent],
    });
    fixture = TestBed.createComponent(ViewLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

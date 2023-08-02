import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLessonsForLevelComponent } from './view-lessons-for-level.component';

describe('ViewLessonsForLevelComponent', () => {
  let component: ViewLessonsForLevelComponent;
  let fixture: ComponentFixture<ViewLessonsForLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLessonsForLevelComponent]
    });
    fixture = TestBed.createComponent(ViewLessonsForLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

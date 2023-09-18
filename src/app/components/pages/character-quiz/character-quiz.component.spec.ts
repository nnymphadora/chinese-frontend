import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterQuizComponent } from './character-quiz.component';

describe('CharacterQuizComponent', () => {
  let component: CharacterQuizComponent;
  let fixture: ComponentFixture<CharacterQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterQuizComponent]
    });
    fixture = TestBed.createComponent(CharacterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

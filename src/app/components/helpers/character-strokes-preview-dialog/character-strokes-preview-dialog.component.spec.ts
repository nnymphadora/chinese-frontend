import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStrokesPreviewComponent } from './character-strokes-preview-dialog.component';

describe('CharacterStrokesPreviewComponent', () => {
  let component: CharacterStrokesPreviewComponent;
  let fixture: ComponentFixture<CharacterStrokesPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterStrokesPreviewComponent],
    });
    fixture = TestBed.createComponent(CharacterStrokesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

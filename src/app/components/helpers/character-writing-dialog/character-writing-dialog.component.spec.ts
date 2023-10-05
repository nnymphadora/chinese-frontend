import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWritingDialogComponent } from './character-writing-dialog.component';

describe('CharacterWritingDialogComponent', () => {
  let component: CharacterWritingDialogComponent;
  let fixture: ComponentFixture<CharacterWritingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterWritingDialogComponent]
    });
    fixture = TestBed.createComponent(CharacterWritingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

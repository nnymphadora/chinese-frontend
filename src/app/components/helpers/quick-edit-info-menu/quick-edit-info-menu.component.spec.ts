import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickEditInfoMenuComponent } from './quick-edit-info-menu.component';

describe('QuickEditInfoMenuComponent', () => {
  let component: QuickEditInfoMenuComponent;
  let fixture: ComponentFixture<QuickEditInfoMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickEditInfoMenuComponent]
    });
    fixture = TestBed.createComponent(QuickEditInfoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallScreenNavMenuComponent } from './small-screen-nav-menu.component';

describe('SmallScreenNavMenuComponent', () => {
  let component: SmallScreenNavMenuComponent;
  let fixture: ComponentFixture<SmallScreenNavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallScreenNavMenuComponent]
    });
    fixture = TestBed.createComponent(SmallScreenNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

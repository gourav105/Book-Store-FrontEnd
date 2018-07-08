import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaywishlistComponent } from './displaywishlist.component';

describe('DisplaywishlistComponent', () => {
  let component: DisplaywishlistComponent;
  let fixture: ComponentFixture<DisplaywishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaywishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaywishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

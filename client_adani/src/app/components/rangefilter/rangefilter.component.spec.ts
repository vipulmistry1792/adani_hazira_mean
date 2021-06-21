import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangefilterComponent } from './rangefilter.component';

describe('RangefilterComponent', () => {
  let component: RangefilterComponent;
  let fixture: ComponentFixture<RangefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

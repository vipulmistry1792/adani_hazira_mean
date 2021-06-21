import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBootstrapDatepickerComponent } from './ngx-bootstrap-datepicker.component';

describe('NgxBootstrapDatepickerComponent', () => {
  let component: NgxBootstrapDatepickerComponent;
  let fixture: ComponentFixture<NgxBootstrapDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBootstrapDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

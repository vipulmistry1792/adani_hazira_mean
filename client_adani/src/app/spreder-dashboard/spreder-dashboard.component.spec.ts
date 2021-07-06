import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprederDashboardComponent } from './spreder-dashboard.component';

describe('SprederDashboardComponent', () => {
  let component: SprederDashboardComponent;
  let fixture: ComponentFixture<SprederDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprederDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprederDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

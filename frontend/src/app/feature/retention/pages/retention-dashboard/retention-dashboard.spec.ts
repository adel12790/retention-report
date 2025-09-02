import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionDashboardPage } from './retention-dashboard.page';

describe('RetentionDashboard', () => {
  let component: RetentionDashboardPage;
  let fixture: ComponentFixture<RetentionDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetentionDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetentionDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

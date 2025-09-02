import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionFiltersComponent } from './retention-filters.component';

describe('RetentionFilters', () => {
  let component: RetentionFiltersComponent;
  let fixture: ComponentFixture<RetentionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetentionFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetentionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

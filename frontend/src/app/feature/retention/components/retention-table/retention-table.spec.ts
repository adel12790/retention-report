import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionTableComponent } from './retention-table.component';

describe('RetentionTable', () => {
  let component: RetentionTableComponent;
  let fixture: ComponentFixture<RetentionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetentionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetentionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetentionRequest } from '../../models/retention';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-retention-filters',
  standalone: false,
  templateUrl: './retention-filters.html',
  styleUrl: './retention-filters.scss'
})
export class RetentionFiltersComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<RetentionRequest>();

  filterForm!: FormGroup;
  maxDate = new Date('2024-09-30');

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.onSubmit();
  }

  private initializeForm() {
    const defaultMonth = new Date('2022-01-01');
    defaultMonth.setMonth(defaultMonth.getMonth());
    this.filterForm = this.fb.group({
      referenceMonth: [this.formatDate(defaultMonth), Validators.required],
      monthsToTrack: [3, [Validators.required, Validators.min(1), Validators.max(12)]],
    });
  }

  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.filterChanged.emit(this.filterForm.value);
    }
  }

  onReset() {
    this.initializeForm();
    this.onSubmit();
  }

}

import { Component, OnInit } from '@angular/core';
import { RetentionService } from '../../services/retention.service';
import { RetentionResponse, RetentionRequest } from '../../models/retention';

@Component({
  selector: 'app-retention-dashboard',
  standalone: false,
  templateUrl: './retention-dashboard.html',
  styleUrl: './retention-dashboard.scss'
})
export class RetentionDashboardPage {
  retentionData: RetentionResponse | null = null;
  loading = false;
  error: string | null = null;

  constructor(private retentionService: RetentionService) {}

  onFilterChanged(request: RetentionRequest) {
    this.loadRetentionData(request);
  }

  loadRetentionData(request?: RetentionRequest) {
    this.loading = true;
    this.error = null;

    const defaultRequest: RetentionRequest = {
      referenceMonth: '2022-01',
      monthsToTrack: 3
    };

    const requestToUse = request || defaultRequest;

    this.retentionService.getRetentionReport(requestToUse).subscribe({
      next: (data) => {
        this.retentionData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load retention data';
        this.loading = false;
        console.error('Error loading retention data:', err);
      }
    });
  }
}

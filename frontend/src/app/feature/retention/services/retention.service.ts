import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api/api.service';
import { RetentionResponse, RetentionRequest } from '../models/retention';

@Injectable({
  providedIn: 'root'
})
export class RetentionService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getRetentionReport(request: RetentionRequest): Observable<RetentionResponse> {
    this.loadingSubject.next(true);

    const params = {
      referenceMonth: request.referenceMonth,
      ...(request.monthsToTrack && { monthsToTrack: request.monthsToTrack }),
    };


    return this.apiService.get<RetentionResponse>('/retention', params).pipe(
      map((response) => response.data),
      tap(() => this.loadingSubject.next(false)),
    );
  }
}

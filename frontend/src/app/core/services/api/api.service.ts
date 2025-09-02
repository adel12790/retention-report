import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get<T>(endpoint: string, params?: { [key:string]: string | number }): Observable<ApiResponse<T>> {
        let httpParams = new HttpParams();

        if (params) {
          Object.keys(params).forEach(key => {
            if(params[key] !== undefined && params[key] !== null) {
              httpParams = httpParams.set(key, params[key].toString());
            }
          });
        }

        return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, { params: httpParams });
    }
}

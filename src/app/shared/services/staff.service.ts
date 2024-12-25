import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.endpoint;

  getStaff(staffId: string): Observable<any[]> {
    const params = { code: staffId };
    return this.http.get<any[]>(`${this.apiUrl}/staff`, { params });
  }
}

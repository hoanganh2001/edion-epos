import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.endpoint;

  getSales(): Observable<any[]> {
    const timeStart = new Date().getTime();
    const result = this.http.get<any[]>(`${this.apiUrl}/productList`);
    const timeEnd = new Date().getTime();
    console.log('timeStart - timeEnd', timeEnd - timeStart);
    return result;
  }
}

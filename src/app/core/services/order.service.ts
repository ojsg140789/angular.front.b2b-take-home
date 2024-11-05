import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSummary } from '../domain/entities/order-summary';
import { OrderOperation } from '../domain/entities/order-operation';
import { API_BASE_URL } from '../config/api-config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${API_BASE_URL}/Order`;

  constructor(private http: HttpClient) {}

  getOrderSummary(branchId?: number): Observable<OrderSummary> {
    let params = new HttpParams();
    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<OrderSummary>(`${this.apiUrl}/summary`, { params });
  }

  getDistinctBranches(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/distinct-branches`);
  }

  getOrderOperations(): Observable<OrderOperation[]> {
    return this.http.get<OrderOperation[]>(`${this.apiUrl}/operations`);
  }
}

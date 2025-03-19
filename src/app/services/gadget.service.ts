import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gadget } from '../models/gadget.model';

@Injectable({
  providedIn: 'root'
})
export class GadgetService {
  private readonly API_URL = 'http://localhost:5000/api/gadgets';

  constructor(private http: HttpClient) {}

  getGadgets(page: number = 1, pageSize: number = 10): Observable<{ items: Gadget[], total: number }> {
    return this.http.get<{ items: Gadget[], total: number }>(
      `${this.API_URL}?page=${page}&pageSize=${pageSize}`
    );
  }

  getGadget(id: number): Observable<Gadget> {
    return this.http.get<Gadget>(`${this.API_URL}/${id}`);
  }

  createGadget(gadget: Omit<Gadget, 'id'>): Observable<Gadget> {
    return this.http.post<Gadget>(this.API_URL, gadget);
  }

  updateGadget(id: number, gadget: Partial<Gadget>): Observable<Gadget> {
    return this.http.put<Gadget>(`${this.API_URL}/${id}`, gadget);
  }

  deleteGadget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  bulkUpdate(ids: number[], updates: Partial<Gadget>): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/bulk`, { ids, updates });
  }

  bulkDelete(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/bulk-delete`, { ids });
  }
}
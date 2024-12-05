import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl = `${environment.apiUrl}/specialties`;

  constructor(private http: HttpClient) { }

  getAllSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  getUsersBySpecialty(specialtyId: number): Observable<{ id: number, username: string }[]> {
    return this.http.get<{ id: number, username: string }[]>(`${this.apiUrl}/${specialtyId}/users`);
  }
}
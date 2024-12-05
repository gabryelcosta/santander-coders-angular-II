import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface RegisterData {
  username: string;
  login: string;
  password: string;
  roleId: number;
  specialtyId?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  createAdmin(registerData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, registerData);
  }
}
// src/app/core/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CaregiverData {
  caregiver_id: number;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  name_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class OthersService {
  private apiCaregivers = `${environment.apiUrl}/api/caregivers`;

  constructor(private http: HttpClient) {}

  getCurrentCaregiver(): Observable<CaregiverData> {
    return this.http.get<CaregiverData>(`${this.apiCaregivers}/me`, {
      withCredentials: true,
    });
  }
}

// src/app/core/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP as HTTPNative } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Define la estructura de una alerta
export interface Alert {
  id: number;
  patient: string;
  message: string;
  time: string;
}

// Define la estructura de una estadística (sin icono)
export interface Stat {
  title: string;
  value: number;
  icon: any;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiPatients = `${environment.apiUrl}/api/patients`;
  private apiAlerts   = `${environment.apiUrl}/api/alerts`;

  constructor(
    private plt: Platform,
    private httpNative: HTTPNative,
    private http: HttpClient
  ) {}

  /** Obtiene las alertas activas */
  getActiveAlerts(): Observable<Alert[]> {
    return from(this.plt.ready()).pipe(
      switchMap(() => {
        if (this.plt.is('hybrid')) {
          this.httpNative.setDataSerializer('json');
          return from(
            this.httpNative.get(
              `${this.apiAlerts}/active`,
              {}, // no params
              {}  // No headers; el plugin maneja cookies automáticamente
            )
          ).pipe(
            map(resp => JSON.parse(resp.data) as Alert[])
          );
        } else {
          return this.http.get<Alert[]>(
            `/api/alerts/active`,
            { withCredentials: true }
          );
        }
      })
    );
  }

  /** Obtiene las estadísticas para un caregiver dado */
  getStats(caregiverId: number): Observable<Stat[]> {
    return from(this.plt.ready()).pipe(
      switchMap(() => {
        if (this.plt.is('hybrid')) {
          this.httpNative.setDataSerializer('json');
          return from(
            this.httpNative.get(
              `${this.apiPatients}/stats/${caregiverId}`,
              {}, // no params
              {}  // plugin maneja cookies automáticamente
            )
          ).pipe(
            map(resp => JSON.parse(resp.data) as Stat[])
          );
        } else {
          return this.http.get<Stat[]>(
            `/api/patients/stats/${caregiverId}`,
            { withCredentials: true }
          );
        }
      })
    );
  }
}

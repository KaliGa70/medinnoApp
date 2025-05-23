// src/app/dashboard/dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as IonIcons from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { finalize } from 'rxjs/operators';
import { AuthService, CaregiverProfile } from '../core/services/auth/auth.service';
import { Alert, DashboardService } from '../core/services/DashboardService/dashboard.service';

type IconName = keyof typeof IonIcons;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private ICON_MAP: Record<string, any> = IonIcons;
  
  // Mapa de tipos de alerta
  BUTTON_ALERT_MAP = {
    0: 'CALL_NURSE',
    1: 'EMERGENCY',
    2: 'MEDICATION',
    3: 'ASSISTANCE',
    4: 'PAIN',
    5: 'MEAL',
    6: 'WATER',
  };

  activeAlerts: Alert[] = [];
  stats: Array<{ title: string; value: number; icon: typeof IonIcons[IconName] }> = [];
  loadingAlerts = false;
  loadingStats = false;

  caregiverData?: CaregiverProfile;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Primero traemos el perfil para obtener el caregiver_id
    this.authService.getCurrentCaregiver()
      .subscribe({
        next: data => {
          this.caregiverData = data;
          this.loadAlerts();
          this.loadStats();
        },
        error: err => {
          console.error('No se pudo obtener caregiver:', err);
        }
      });
  }

  loadAlerts() {
    this.loadingAlerts = true;
    this.dashboardService.getActiveAlerts()
      .pipe(finalize(() => this.loadingAlerts = false))
      .subscribe({
        next: alerts => this.activeAlerts = alerts,
        error: err => {
          console.error('Error cargando alertas:', err);
          this.activeAlerts = [];
        }
      });
  }

  loadStats() {
    if (!this.caregiverData) {
      console.warn('Sin caregiverData, no cargo estadísticas');
      return;
    }
    this.loadingStats = true;
    this.dashboardService.getStats(this.caregiverData.caregiver_id)
      .pipe(finalize(() => this.loadingStats = false))
      .subscribe({
        next: statsFromApi => {
          // Mapear el string "peopleOutline"/"clipboardOutline" a la constante real
          this.stats = statsFromApi.map(s => ({
            title: s.title,
            value: s.value,
            icon: this.ICON_MAP[s.icon]
          }));
        },
        error: err => {
          console.error('Error cargando estadísticas:', err);
          this.stats = [];
        }
      });
  }

  attendAlert(id: number): void {
    this.activeAlerts = this.activeAlerts.filter(a => a.id !== id);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { peopleOutline, clipboardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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

// Ejemplo de un historial de alertas usando uno de esos tipos
activeAlerts = [
  {
    id: 1,
    patient: 'Ana Gómez',
    message: this.BUTTON_ALERT_MAP[1],   // "EMERGENCY"
    time: '08:30 AM'
  },
  {
    id: 2,
    patient: 'Luis Martínez',
    message: this.BUTTON_ALERT_MAP[4],   // "PAIN"
    time: '09:15 AM'
  },
  {
    id: 3,
    patient: 'María Pérez',
    message: this.BUTTON_ALERT_MAP[2],   // "MEDICATION"
    time: '10:00 AM'
  },
  {
    id: 4,
    patient: 'Juan López',
    message: this.BUTTON_ALERT_MAP[3],   // "ASSISTANCE"
    time: '11:00 AM'
  },
  {
    id: 5,
    patient: 'Laura Torres',
    message: this.BUTTON_ALERT_MAP[5],   // "MEAL"
    time: '12:00 PM'
  },
  {
    id: 6,
    patient: 'Carlos Ruiz',
    message: this.BUTTON_ALERT_MAP[0],   // "CALL_NURSE"
    time: '01:00 PM'
  },
];

  stats = [
    { title: 'Total Pacientes', value: 120, icon: peopleOutline },
    { title: 'Panels Activos',  value: 95,  icon: clipboardOutline },
  ];

  constructor() {}

  ngOnInit(): void {}

  /** Marca la alerta como atendida y la elimina de la lista */
  attendAlert(id: number): void {
    this.activeAlerts = this.activeAlerts.filter(alert => alert.id !== id);
  }
}

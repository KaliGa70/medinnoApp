import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { peopleOutline, clipboardOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HistoryPage implements OnInit {

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
historialAlerts = [
  {
    patient: 'Ana Gómez',
    message: this.BUTTON_ALERT_MAP[1],   // "EMERGENCY"
    time: '08:30 AM'
  },
  {
    patient: 'Luis Martínez',
    message: this.BUTTON_ALERT_MAP[4],   // "PAIN"
    time: '09:15 AM'
  },
  {
    patient: 'María Pérez',
    message: this.BUTTON_ALERT_MAP[2],   // "MEDICATION"
    time: '10:00 AM'
  },
  {
    patient: 'Juan López',
    message: this.BUTTON_ALERT_MAP[3],   // "ASSISTANCE"
    time: '11:00 AM'
  },
  {
    patient: 'Laura Torres',
    message: this.BUTTON_ALERT_MAP[5],   // "MEAL"
    time: '12:00 PM'
  },
  {
    patient: 'Carlos Ruiz',
    message: this.BUTTON_ALERT_MAP[0],   // "CALL_NURSE"
    time: '01:00 PM'
  },
  {
    patient: 'Sofía Martínez',
    message: this.BUTTON_ALERT_MAP[6],   // "WATER"
    time: '02:00 PM'
  },
  {
    patient: 'Pedro González',
    message: this.BUTTON_ALERT_MAP[1],   // "EMERGENCY"
    time: '03:00 PM'
  },
  {
    patient: 'Lucía Fernández',
    message: this.BUTTON_ALERT_MAP[4],   // "PAIN"
    time: '04:00 PM'
  },
];

  // Término de búsqueda
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}

  // Filtra según el searchTerm
  get filteredAlerts() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.historialAlerts;
    }
    return this.historialAlerts.filter(r =>
      r.patient.toLowerCase().includes(term)
    );
  }

}

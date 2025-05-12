import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-link-up-qr',
  templateUrl: './link-up-qr.page.html',
  styleUrls: ['./link-up-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LinkUpQrPage implements OnInit {

  // Lista de pacientes de ejemplo
  patients = ['Ana Gómez', 'Luis Martínez', 'María Pérez'];
  selectedPatient: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  // Método stub para escanear QR
  scanQr(): void {
    console.log('Botón Escanear QR pulsado. Aquí iría la lógica de cámara.');
  }

}

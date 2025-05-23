// src/app/pages/profile/account.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { personCircleOutline, mailOutline, callOutline } from 'ionicons/icons';
import { OthersService } from 'src/app/core/services/OthersService/others.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AccountPage {
  public iconPerson = personCircleOutline;
  public iconMail = mailOutline;
  public iconCall = callOutline;

  caregiverData: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private othersService: OthersService,
  ) {}

  ngOnInit() {
    this.othersService.getCurrentCaregiver().subscribe((data) => {
      this.caregiverData = data;
    });
  }

  /** Cierra sesión y redirige al login */
  onLogout() {
    this.auth.logout().subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Sesión cerrada',
          duration: 2000,
          color: 'success',
          position: 'bottom',
        });
        toast.present();

        // Borra historial y navega al login
        this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'No se pudo cerrar sesión',
          duration: 2000,
          color: 'danger',
          position: 'bottom',
        });
        toast.present();
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuController, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToggle,
  IonContent,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import {
  homeOutline,
  checkboxOutline,
  personOutline,
  timeOutline,
  logOutOutline,
} from 'ionicons/icons';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    IonImg,
    FormsModule,
    RouterModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonToggle,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public darkMode = false;
  public logoutIcon = logOutOutline;
  public isLoggedIn$ = this.auth.isLoggedIn$;

  // Sólo las rutas principales que quieres mostrar
  public appPages = [
    {
      title: 'home',
      url: '/home',
      icon: homeOutline,
    },
    {
      title: 'Activar paneles',
      url: '/paneles/activar',
      icon: checkboxOutline,
    },
    {
      title: 'Historial',
      url: '/historial',
      icon: timeOutline,
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: personOutline,
    },
  ];

  constructor(
    private menu: MenuController,
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {
    this.darkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
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
        this.menu.close(); // Cierra menú al hacer logout
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

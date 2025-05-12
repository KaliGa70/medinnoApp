import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuController, IonImg } from '@ionic/angular/standalone';
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
  timeOutline 
} from 'ionicons/icons';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
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

  // Sólo las rutas principales que quieres mostrar
  public appPages = [
    { 
      title: 'home', 
      url: '/home', 
      icon: homeOutline    
    },
    {
      title: 'Activar paneles',
      url: '/paneles/activar',
      icon: checkboxOutline
    },
    { 
      title: 'Historial', 
      url: '/historial', 
      icon: timeOutline 
    },
    { 
      title: 'Perfil', 
      url: '/profile', 
      icon: personOutline 
    },
  ];

  constructor(private menu: MenuController) {
    this.darkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark', this.darkMode);
  }

  closeMenu() {
    this.menu.close();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonSpinner,
  ],
})
export class LoginPage {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  async onSubmit() {
    if (this.submitting || this.loginForm.invalid) {
      return;
    }

    this.submitting = true;
    const { email, password } = this.loginForm.value as { email: string; password: string };

    this.auth.login(email, password).subscribe({
      next: async (res) => {
        this.submitting = false;

        await this.showToast('Inicio de sesión correcto', 'success');

        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: async (err) => {
        this.submitting = false;
        const msg = err.status === 401
          ? 'Credenciales inválidas'
          : 'Error al conectar con el servidor';

        await this.showToast(msg, 'danger');
      },
    });
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2500,
      position: 'bottom',
    });
    await toast.present();
  }
}

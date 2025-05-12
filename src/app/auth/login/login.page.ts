import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormGroup,
  FormsModule, 
  ReactiveFormsModule, 
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    CommonModule,
    FormsModule,
    IonCardContent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) 
  {
    // Constructor vacío
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Login:', credentials);

      // TODO: autenticar…

      // Si la autenticación es exitosa, redirige al dashboard:
      this.router.navigate(['/home']);
    }
  }
}

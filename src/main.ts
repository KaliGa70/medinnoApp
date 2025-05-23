// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { HTTP } from '@awesome-cordova-plugins/http/ngx'; // ← IMPORTA ESTO
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CsrfInterceptor } from './app/core/interceptors/csrf/csrf.interceptor';
import { environment } from './environments/environment';
import { AuthInterceptor } from './app/core/interceptors/auth/auth.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Ionic (Platform, MenuController, ToastController…)
    provideIonicAngular(),

    // Routing
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // HttpClient + tu interceptor
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // ← Registra aquí el plugin de HTTP nativo
    HTTP,
  ],
}).catch((err) => console.error(err));

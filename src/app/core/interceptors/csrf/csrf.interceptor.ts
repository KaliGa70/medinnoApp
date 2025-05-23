import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrf = this.auth.accessCsrf;
    if (csrf) {
      req = req.clone({
        headers: req.headers.set('X-CSRF-TOKEN', csrf)
      });
    }
    return next.handle(req);
  }
}

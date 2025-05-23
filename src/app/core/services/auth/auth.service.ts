// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP as HTTPNative } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginResponse {
  msg: string;
  access_csrf: string;
  refresh_csrf: string;
}

export interface CaregiverProfile {
  caregiver_id: number;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  name_id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBase = `${environment.apiUrl}/api/caregivers`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private plt: Platform,
    private httpNative: HTTPNative,
    private http: HttpClient
  ) {}

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_csrf');
  }

  /**
   * Obtiene el perfil del cuidador actual.
   * En modo híbrido usa el plugin nativo para manejar cookies,
   * en web usa HttpClient con withCredentials.
   */
  getCurrentCaregiver(): Observable<CaregiverProfile> {
    return from(this.plt.ready()).pipe(
      switchMap(() => {
        if (this.plt.is('hybrid')) {
          this.httpNative.setDataSerializer('json');
          return from(
            this.httpNative.get(
              `${this.apiBase}/me`,
              {}, // no params
              { 'Content-Type': 'application/json' } // headers
            )
          ).pipe(
            map(resp => JSON.parse(resp.data) as CaregiverProfile)
          );
        } else {
          return this.http.get<CaregiverProfile>(
            `/api/caregivers/me`,
            { withCredentials: true }
          );
        }
      })
    );
  }

  /**
   * Login unificado: espera a Platform.ready(), decide rama Web o Hybrid.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return from(this.plt.ready()).pipe(
      switchMap(() =>
        this.plt.is('hybrid')
          ? this.loginNative(email, password)
          : this.loginWeb(email, password)
      )
    );
  }

  /** Web: HttpClient con cookies */
  private loginWeb(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `/api/caregivers/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap(res => this.storeTokens(res))
      );
  }

  /** Nativo: plugin advanced-http, forzamos JSON */
  private loginNative(email: string, password: string): Observable<LoginResponse> {
    this.httpNative.setDataSerializer('json');
    return from(
      this.httpNative.post(
        `${this.apiBase}/login`,
        { email, password },
        { 'Content-Type': 'application/json' }
      )
    ).pipe(
      map(resp => JSON.parse(resp.data) as LoginResponse),
      tap(res => this.storeTokens(res))
    );
  }

  /** Logout unificado */
  logout(): Observable<void> {
    return from(this.plt.ready()).pipe(
      switchMap(() =>
        this.plt.is('hybrid') ? this.logoutNative() : this.logoutWeb()
      )
    );
  }

  /** Web logout */
  private logoutWeb(): Observable<void> {
    return this.http
      .post<void>(
        `/api/caregivers/logout`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          localStorage.clear();
          this.loggedInSubject.next(false);
        })
      );
  }

  /** Native logout, también en JSON */
  private logoutNative(): Observable<void> {
    this.httpNative.setDataSerializer('json');
    return from(
      this.httpNative.post(
        `${this.apiBase}/logout`,
        {},
        { 'Content-Type': 'application/json' }
      )
    ).pipe(
      tap(() => {
        localStorage.clear();
        this.loggedInSubject.next(false);
      }),
      map(() => void 0)
    );
  }

  /** Almacena CSRF tokens en localStorage y notifica login */
  private storeTokens(res: LoginResponse) {
    localStorage.setItem('access_csrf', res.access_csrf);
    localStorage.setItem('refresh_csrf', res.refresh_csrf);
    this.loggedInSubject.next(true);
  }

  /** Getter para el token CSRF de acceso */
  get accessCsrf(): string | null {
    return localStorage.getItem('access_csrf');
  }
}

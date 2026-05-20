import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <p class="subtitle">Sistema PQRS - Universidad del Quindío</p>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="field">
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" [(ngModel)]="email" name="email"
              placeholder="correo@uniquindio.edu.co" required #emailInput="ngModel" />
            <p class="field-error" *ngIf="emailInput.invalid && emailInput.touched">El correo es obligatorio</p>
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input id="password" type="password" [(ngModel)]="password" name="password"
              placeholder="••••••••" required #passInput="ngModel" />
            <p class="field-error" *ngIf="passInput.invalid && passInput.touched">La contraseña es obligatoria</p>
          </div>
          <button type="submit" [disabled]="loading">
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
          <p class="error" *ngIf="error">{{ error }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex; justify-content: center; align-items: center;
      min-height: 100vh; background: linear-gradient(135deg, #1565c0, #0d47a1);
    }
    .login-card {
      background: white; padding: 2.5rem; border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,.2); width: 100%; max-width: 400px;
    }
    h2 { margin: 0 0 .3rem; text-align: center; color: #1a1a2e; }
    .subtitle { text-align: center; color: #888; font-size: .85rem; margin-bottom: 1.5rem; }
    .field { margin-bottom: 1.2rem; }
    label { display: block; margin-bottom: .3rem; font-weight: 600; color: #555; font-size: .9rem; }
    input {
      width: 100%; padding: .7rem; border: 1px solid #ddd; border-radius: 6px;
      box-sizing: border-box; font-size: .95rem; transition: border-color .2s;
    }
    input:focus { outline: none; border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,.15); }
    button {
      width: 100%; padding: .75rem; background: #1976d2; color: white;
      border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; font-weight: 600;
      transition: background .2s;
    }
    button:hover:not(:disabled) { background: #1565c0; }
    button:disabled { opacity: .6; cursor: not-allowed; }
    .error { color: #d32f2f; text-align: center; margin-top: 1rem; font-size: .9rem; }
    .field-error { color: #d32f2f; font-size: .8rem; margin-top: .2rem; }
  `]
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  onSubmit(): void {
    if (!this.email || !this.password) return;
    this.loading = true;
    this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigateByUrl('/solicitudes'),
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.error = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo.';
        } else if (err.status === 401) {
          this.error = 'Credenciales inválidas';
        } else {
          this.error = err.error?.message || 'Error al iniciar sesión';
        }
        this.loading = false;
      }
    });
  }
}

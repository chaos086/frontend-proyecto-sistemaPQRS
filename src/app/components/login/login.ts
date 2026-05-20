import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Fluid } from 'primeng/fluid';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule, Card, InputText, Password, Button, Message, Fluid],
  template: `
    <div class="login-container">
      <p-card styleClass="login-card">
        <ng-template pTemplate="header">
          <div class="login-logo-box">
            <span class="login-logo-text">UQ</span>
          </div>
        </ng-template>
        <h2>Iniciar Sesi\u00F3n</h2>
        <p class="subtitle">Sistema PQRS - Universidad del Quind\u00EDo</p>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <p-fluid>
            <div class="field">
              <label for="email">Correo electr\u00F3nico</label>
              <input id="email" type="email" pInputText [(ngModel)]="email" name="email"
                placeholder="correo@uniquindio.edu.co" required #emailInput="ngModel" />
              <p-message severity="error" text="El correo es obligatorio" *ngIf="emailInput.invalid && emailInput.touched" />
            </div>
            <div class="field">
              <label for="password">Contrase\u00F1a</label>
              <p-password [(ngModel)]="password" name="password" [feedback]="false" [toggleMask]="true"
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required #passInput="ngModel"
                [inputStyle]="{'width':'100%'}" styleClass="w-full" />
              <p-message severity="error" text="La contrase\u00F1a es obligatoria" *ngIf="passInput.invalid && passInput.touched" />
            </div>
          </p-fluid>
          <p-button type="submit" [disabled]="loading" [label]="loading ? 'Ingresando...' : 'Ingresar'" styleClass="w-full mt-3" />
          <p-message severity="error" [text]="error" *ngIf="error" styleClass="w-full mt-2" />
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex; justify-content: center; align-items: center;
      min-height: 100vh; background: linear-gradient(135deg, #2E1065 0%, #5B21B6 50%, #4F46E5 100%);
    }
    :host ::ng-deep .login-card { max-width: 420px; border-radius: 24px; padding: 0; }
    :host ::ng-deep .login-card .p-card-body { padding: 2rem; }
    .login-logo-box {
      width: 72px; height: 72px; background: linear-gradient(135deg, #6D28D9, #4F46E5);
      border-radius: 18px; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.2rem;
    }
    .login-logo-text { color: white; font-size: 2rem; font-weight: 900; }
    h2 { margin: 0 0 .3rem; text-align: center; color: #1E1B4B; font-size: 1.6rem; }
    .subtitle { text-align: center; color: var(--slate-500); font-size: .85rem; margin-bottom: 1.5rem; }
    .field { margin-bottom: 1.2rem; }
    label { display: block; margin-bottom: .3rem; font-weight: 600; color: var(--slate-600); font-size: .9rem; }
    .mt-3 { margin-top: 1rem; }
    .mt-2 { margin-top: .5rem; }
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
      next: () => this.router.navigateByUrl('/inicio'),
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.error = 'No se puede conectar con el servidor. Verifica que el backend est\u00E9 corriendo.';
        } else if (err.status === 401) {
          this.error = 'Credenciales inv\u00E1lidas';
        } else {
          this.error = err.error?.message || 'Error al iniciar sesi\u00F3n';
        }
        this.loading = false;
      }
    });
  }
}

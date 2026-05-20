import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [NgIf, FormsModule, RouterLink],
  template: `
    <h2>Nuevo Usuario</h2>
    <form (ngSubmit)="onSubmit()" class="card-form">
      <div class="field">
        <label for="nombre">Nombre</label>
        <input id="nombre" [(ngModel)]="nombre" name="nombre" placeholder="Nombre completo" />
        <p class="field-error" *ngIf="errorNombre">{{ errorNombre }}</p>
      </div>
      <div class="field">
        <label for="email">Correo electrónico</label>
        <input id="email" type="email" [(ngModel)]="email" name="email" placeholder="correo@uniquindio.edu.co" />
        <p class="field-error" *ngIf="errorEmail">{{ errorEmail }}</p>
      </div>
      <div class="field">
        <label for="rol">Rol</label>
        <select id="rol" [(ngModel)]="rol" name="rol">
          <option value="ESTUDIANTE">Estudiante</option>
          <option value="PROFESOR">Profesor</option>
          <option value="ADMINISTRATIVO">Administrativo</option>
          <option value="COORDINADOR">Coordinador</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" [disabled]="enviando" class="btn-primary">{{ enviando ? 'Creando...' : 'Crear Usuario' }}</button>
        <a routerLink="/usuarios" class="btn-cancel">Cancelar</a>
      </div>
      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="success" *ngIf="exito">Usuario creado exitosamente</p>
    </form>
  `,
  styles: [`
    .card-form { max-width: 500px; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .field { margin-bottom: 1rem; }
    label { display: block; margin-bottom: .3rem; font-weight: 600; color: #555; font-size: .9rem; }
    input, select { width: 100%; padding: .5rem; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: .9rem; }
    .field-error { color: #d32f2f; font-size: .8rem; margin-top: .2rem; }
    .form-actions { display: flex; gap: .5rem; align-items: center; margin-top: 1.5rem; }
    .btn-primary { padding: .5rem 1.5rem; background: #1976d2; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
    .btn-cancel { padding: .5rem 1.5rem; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 6px; font-size: .9rem; }
    .error { color: #d32f2f; margin-top: .8rem; }
    .success { color: #2e7d32; margin-top: .8rem; }
  `]
})
export class CrearUsuario {
  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);

  nombre = '';
  email = '';
  rol = 'ESTUDIANTE';
  enviando = false;
  error = '';
  exito = false;

  errorNombre = '';
  errorEmail = '';

  private validar(): boolean {
    let ok = true;
    this.errorNombre = ''; this.errorEmail = '';
    if (!this.nombre || this.nombre.length < 3) { this.errorNombre = 'El nombre debe tener al menos 3 caracteres'; ok = false; }
    if (!this.email || !this.email.includes('@')) { this.errorEmail = 'Ingrese un correo electrónico válido'; ok = false; }
    return ok;
  }

  onSubmit(): void {
    if (!this.validar()) return;
    this.enviando = true; this.error = '';
    this.usuarioService.crear({ nombre: this.nombre, rol: this.rol as any, email: this.email }).subscribe({
      next: () => { this.exito = true; this.enviando = false; setTimeout(() => this.router.navigateByUrl('/usuarios'), 1500); },
      error: e => { this.error = e.error?.message || 'Error al crear usuario'; this.enviando = false; }
    });
  }
}

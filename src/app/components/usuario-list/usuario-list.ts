import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import type { UsuarioResponse } from '../../models/usuario.models';

@Component({
  selector: 'app-usuario-list',
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="header-bar">
      <h2>Usuarios</h2>
      <a routerLink="/crear-usuario" class="btn-primary">+ Nuevo Usuario</a>
    </div>

    <p class="loading" *ngIf="loading">Cargando usuarios...</p>
    <p class="error" *ngIf="error">{{ error }}</p>

    <div class="table-wrapper" *ngIf="!loading && !error">
      <table>
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of usuarios">
            <td>{{ u.nombre }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.rol }}</td>
            <td><span class="badge" [class]="u.estado">{{ u.estado }}</span></td>
            <td class="actions-cell">
              <button *ngIf="u.estado === 'ACTIVO' && esCoordinador()" (click)="desactivar(u)" class="btn-sm btn-danger-outline">Desactivar</button>
              <button *ngIf="u.estado === 'INACTIVO' && esCoordinador()" (click)="activar(u)" class="btn-sm btn-primary-outline">Activar</button>
            </td>
          </tr>
          <tr *ngIf="usuarios.length === 0"><td colspan="5" class="empty">No hay usuarios registrados</td></tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .table-wrapper { background: white; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.08); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .7rem .8rem; text-align: left; border-bottom: 1px solid #f0f0f0; font-size: .9rem; }
    th { background: #fafafa; font-weight: 600; color: #555; font-size: .8rem; text-transform: uppercase; letter-spacing: .5px; }
    tr:last-child td { border-bottom: none; }
    .badge { padding: .2rem .6rem; border-radius: 12px; font-size: .8rem; font-weight: 500; }
    .ACTIVO { background: #e8f5e9; color: #2e7d32; }
    .INACTIVO { background: #fbe9e7; color: #c62828; }
    .actions-cell { display: flex; gap: .3rem; }
    .btn-sm { padding: .3rem .6rem; border-radius: 4px; cursor: pointer; font-size: .8rem; border: 1px solid; transition: background .2s, color .2s; }
    .btn-primary-outline { border-color: #1976d2; background: white; color: #1976d2; }
    .btn-primary-outline:hover { background: #1976d2; color: white; }
    .btn-danger-outline { border-color: #d32f2f; background: white; color: #d32f2f; }
    .btn-danger-outline:hover { background: #d32f2f; color: white; }
    .btn-primary { padding: .5rem 1rem; background: #1976d2; color: white; text-decoration: none; border-radius: 6px; font-size: .9rem; transition: background .2s; }
    .btn-primary:hover { background: #1565c0; text-decoration: none; }
    .empty { text-align: center; color: #999; padding: 2rem; font-style: italic; }
    .loading, .error { text-align: center; padding: 2rem; }
    .error { color: #d32f2f; background: #fff5f5; border-radius: 8px; border: 1px solid #ffcdd2; }
  `]
})
export class UsuarioList implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly auth = inject(AuthService);

  usuarios: UsuarioResponse[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    this.usuarioService.listar().subscribe({
      next: data => { this.usuarios = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar usuarios. ¿El backend está corriendo?'; this.loading = false; }
    });
  }

  esCoordinador(): boolean {
    return this.auth.hasRole('ROLE_COORDINADOR');
  }

  activar(u: UsuarioResponse): void {
    this.usuarioService.activar(u.id).subscribe(() => u.estado = 'ACTIVO');
  }

  desactivar(u: UsuarioResponse): void {
    this.usuarioService.desactivar(u.id).subscribe(() => u.estado = 'INACTIVO');
  }
}

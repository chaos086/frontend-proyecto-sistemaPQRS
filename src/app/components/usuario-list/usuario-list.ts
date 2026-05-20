import { Component, inject, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import type { UsuarioResponse } from '../../models/usuario.models';
import { ROL_LABELS } from '../../models/enums';

@Component({
  selector: 'app-usuario-list',
  imports: [NgFor, NgIf, RouterLink, Paginator],
  template: `
    <div class="page-card">
      <div class="page-header">
        <div>
          <h2 class="page-title">Usuarios</h2>
          <p class="page-sub">Gesti\u00F3n de usuarios del sistema</p>
        </div>
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
              <td class="td-bold">{{ u.nombre }}</td>
              <td class="td-muted">{{ u.email }}</td>
              <td><span class="badge badge-purple">{{ rolLabel(u.rol) }}</span></td>
              <td><span class="badge" [class]="u.estado === 'ACTIVO' ? 'badge-green' : 'badge-gray'">{{ u.estado }}</span></td>
              <td>
                <button *ngIf="u.estado === 'ACTIVO' && esCoordinador()" (click)="confirmarDesactivar(u)" class="btn-action btn-danger">Desactivar</button>
                <button *ngIf="u.estado === 'INACTIVO' && esCoordinador()" (click)="activar(u)" class="btn-action">Activar</button>
              </td>
            </tr>
            <tr *ngIf="usuarios.length === 0"><td colspan="5" class="empty-cell">No hay usuarios registrados</td></tr>
          </tbody>
        </table>
        <p-paginator [first]="first()" [rows]="rows()" [totalRecords]="totalRecords()" [showCurrentPageReport]="true" currentPageReportTemplate="{first} a {last} de {totalRecords}" (onPageChange)="onPageChange($event)" />
      </div>
    </div>
  `,
  styles: [`
    .page-card { background: white; border-radius: 24px; padding: 2rem; box-shadow: var(--shadow-sm); border: 1px solid var(--slate-100); }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-title { font-size: 1.5rem; font-weight: 700; color: #1E1B4B; }
    .page-sub { color: var(--slate-500); font-size: .9rem; margin-top: .2rem; }
    .table-wrapper { overflow: hidden; border-radius: 16px; border: 1px solid var(--slate-100); }
    table { width: 100%; border-collapse: collapse; }
    th { background: var(--slate-50); text-align: left; padding: 1rem 1rem; font-size: .8rem; color: var(--slate-500); font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
    td { padding: .9rem 1rem; border-top: 1px solid var(--slate-100); font-size: .9rem; }
    tr:hover td { background: var(--slate-50); }
    .td-bold { font-weight: 600; }
    .td-muted { color: var(--slate-500); }
    .empty-cell { text-align: center; color: var(--slate-400); padding: 2rem; }
    .loading, .error { text-align: center; padding: 2rem; }
    .error { color: #DC2626; background: #FEE2E2; border-radius: 12px; border: 1px solid #FECACA; }
    .badge { padding: .3rem .8rem; border-radius: 999px; font-size: .8rem; font-weight: 600; display: inline-block; }
    .badge-purple { background: #EDE9FE; color: #6D28D9; }
    .badge-green { background: #D1FAE5; color: #059669; }
    .badge-gray { background: #F1F5F9; color: #64748B; }
    .btn-primary { background: linear-gradient(135deg, #6D28D9, #4F46E5); color: white; padding: .6rem 1.2rem; border: none; border-radius: 12px; font-weight: 600; font-size: .9rem; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn-primary:hover { opacity: .9; text-decoration: none; color: white; }
    .btn-action { padding: .3rem .7rem; border-radius: 8px; border: none; cursor: pointer; font-size: .8rem; font-weight: 500; background: var(--purple-600); color: white; }
    .btn-action:hover { opacity: .85; }
    .btn-danger { background: #DC2626; }
  `]
})
export class UsuarioList implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly auth = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  usuarios: UsuarioResponse[] = [];
  loading = true;
  error = '';

  readonly first = signal(0);
  readonly rows = signal(10);
  readonly totalRecords = signal(0);

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.loading = true; this.error = '';
    const page = this.first() / this.rows();
    const size = this.rows();
    this.usuarioService.listarPaginado(page, size).subscribe({
      next: data => { this.usuarios = data.content; this.totalRecords.set(data.totalElements); this.loading = false; },
      error: () => {
        this.usuarioService.listar().subscribe({
          next: data => { this.usuarios = data; this.totalRecords.set(data.length); this.loading = false; },
          error: () => { this.error = 'Error al cargar usuarios. \u00BFEl backend est\u00E1 corriendo?'; this.loading = false; }
        });
      }
    });
  }

  onPageChange(event: any): void {
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.cargar();
  }

  rolLabel(rol: string): string { return ROL_LABELS[rol as keyof typeof ROL_LABELS] || rol; }
  esCoordinador(): boolean { return this.auth.hasRole('ROLE_COORDINADOR'); }

  activar(u: UsuarioResponse): void {
    this.usuarioService.activar(u.id).subscribe({
      next: () => { this.notificationService.success(`Usuario ${u.nombre} activado`); this.cargar(); },
      error: () => this.notificationService.error('No se pudo activar el usuario')
    });
  }

  confirmarDesactivar(u: UsuarioResponse): void {
    this.confirmationService.confirm({
      message: `\u00BFEst\u00E1 seguro de desactivar al usuario ${u.nombre}?`,
      header: 'Confirmar desactivaci\u00F3n',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'S\u00ED, desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.usuarioService.desactivar(u.id).subscribe({
          next: () => { this.notificationService.success(`Usuario ${u.nombre} desactivado`); this.cargar(); },
          error: () => this.notificationService.error('No se pudo desactivar el usuario')
        });
      }
    });
  }
}

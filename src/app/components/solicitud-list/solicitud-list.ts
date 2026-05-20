import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import type { SolicitudResponse } from '../../models/solicitud.models';
import type { UsuarioResponse } from '../../models/usuario.models';
import { ESTADOS_SOLICITUD, TIPOS_SOLICITUD, TIPO_LABELS, PRIORIDADES, PRIORIDAD_LABELS } from '../../models/enums';

@Component({
  selector: 'app-solicitud-list',
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  template: `
    <div class="header-bar">
      <h2>Solicitudes</h2>
      <div class="header-right">
        <span class="count" *ngIf="!loading">{{ solicitudes.length }} solicitud(es)</span>
        <select [(ngModel)]="filtroEstado" (change)="cargar()">
          <option value="">Todos los estados</option>
          <option *ngFor="let e of estados" [value]="e">{{ e }}</option>
        </select>
      </div>
    </div>

    <p class="loading" *ngIf="loading">Cargando solicitudes...</p>
    <p class="error" *ngIf="error">{{ error }}</p>

    <div class="table-wrapper" *ngIf="!loading && !error">
      <table>
        <thead>
          <tr>
            <th>Solicitante</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Prioridad</th>
            <th>Responsable</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of solicitudes">
            <td>{{ s.nombreSolicitante }}</td>
            <td><span class="badge" [class]="s.estado">{{ s.estado }}</span></td>
            <td>{{ s.tipoSolicitud || '-' }}</td>
            <td>{{ s.prioridad || '-' }}</td>
            <td>{{ s.nombreResponsable || '-' }}</td>
            <td class="actions-cell">
              <button *ngIf="s.estado === 'REGISTRADA' && esCoordinador()" (click)="abrirForm(s, 'clasificar')" class="btn-sm">Clasificar</button>
              <button *ngIf="s.estado === 'CLASIFICADA' && esCoordinador()" (click)="abrirForm(s, 'priorizar')" class="btn-sm">Priorizar</button>
              <button *ngIf="s.estado === 'CLASIFICADA' && esCoordinador()" (click)="abrirForm(s, 'asignar'); cargarProfesores()" class="btn-sm">Asignar</button>
              <button *ngIf="s.estado === 'EN_ATENCION' && esResponsable(s)" (click)="abrirForm(s, 'atender')" class="btn-sm">Atender</button>
              <button *ngIf="(s.estado === 'EN_ATENCION' || s.estado === 'ATENDIDA') && esResponsable(s)" (click)="abrirForm(s, 'cerrar')" class="btn-sm">Cerrar</button>
              <button (click)="verDetalle(s)" class="btn-sm btn-outline">Detalle</button>
            </td>
          </tr>
          <tr *ngIf="solicitudes.length === 0">
            <td colspan="6" class="empty">No hay solicitudes registradas</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de acción -->
    <div class="modal-overlay" *ngIf="formAccion" (click)="cerrarForm()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h3>{{ tituloAccion }}</h3>

        <div *ngIf="formAccion === 'clasificar'">
          <div class="field">
            <label>Tipo</label>
            <select [(ngModel)]="accionData.tipo">
              <option value="">Seleccione...</option>
              <option *ngFor="let t of tipos" [value]="t">{{ labelsTipo[t] }}</option>
            </select>
          </div>
          <div class="modal-actions">
            <button (click)="ejecutarClasificar()" [disabled]="cargandoAccion || !accionData.tipo" class="btn-primary">
              {{ cargandoAccion ? 'Guardando...' : 'Guardar' }}
            </button>
            <button (click)="cerrarForm()" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <div *ngIf="formAccion === 'priorizar'">
          <div class="field">
            <label>Prioridad</label>
            <select [(ngModel)]="accionData.prioridad">
              <option value="">Seleccione...</option>
              <option *ngFor="let p of prioridades" [value]="p">{{ labelsPrioridad[p] }}</option>
            </select>
          </div>
          <div class="field">
            <label>Justificación</label>
            <textarea [(ngModel)]="accionData.justificacion" rows="3" placeholder="Motivo de la prioridad"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="ejecutarPriorizar()" [disabled]="cargandoAccion || !accionData.prioridad" class="btn-primary">
              {{ cargandoAccion ? 'Guardando...' : 'Guardar' }}
            </button>
            <button (click)="cerrarForm()" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <div *ngIf="formAccion === 'asignar'">
          <div class="field">
            <label>Profesor responsable</label>
            <select [(ngModel)]="accionData.responsableId">
              <option value="">Seleccione...</option>
              <option *ngFor="let p of profesores" [value]="p.id">{{ p.nombre }} ({{ p.email }})</option>
            </select>
          </div>
          <div class="modal-actions">
            <button (click)="ejecutarAsignar()" [disabled]="cargandoAccion || !accionData.responsableId" class="btn-primary">
              {{ cargandoAccion ? 'Guardando...' : 'Guardar' }}
            </button>
            <button (click)="cerrarForm()" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <div *ngIf="formAccion === 'atender'">
          <div class="field">
            <label>Observación</label>
            <textarea [(ngModel)]="accionData.observacion" rows="3" placeholder="Opcional"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="ejecutarAtender()" [disabled]="cargandoAccion" class="btn-primary">
              {{ cargandoAccion ? 'Guardando...' : 'Guardar' }}
            </button>
            <button (click)="cerrarForm()" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <div *ngIf="formAccion === 'cerrar'">
          <div class="field">
            <label>Observación de cierre</label>
            <textarea [(ngModel)]="accionData.observacionCierre" rows="3" placeholder="Obligatorio"></textarea>
          </div>
          <div class="modal-actions">
            <button (click)="ejecutarCerrar()" [disabled]="cargandoAccion || !accionData.observacionCierre" class="btn-primary">
              {{ cargandoAccion ? 'Guardando...' : 'Guardar' }}
            </button>
            <button (click)="cerrarForm()" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <p class="action-error" *ngIf="errorAccion">{{ errorAccion }}</p>
      </div>
    </div>

    <!-- Modal Detalle -->
    <div class="modal-overlay" *ngIf="detalle" (click)="detalle = null">
      <div class="modal modal-wide" (click)="$event.stopPropagation()">
        <h3>Detalle de Solicitud</h3>
        <div class="detail-grid">
          <div><strong>ID:</strong> {{ detalle.id }}</div>
          <div><strong>Solicitante:</strong> {{ detalle.nombreSolicitante }}</div>
          <div><strong>Estado:</strong> <span class="badge" [class]="detalle.estado">{{ detalle.estado }}</span></div>
          <div><strong>Tipo:</strong> {{ detalle.tipoSolicitud || '-' }}</div>
          <div><strong>Prioridad:</strong> {{ detalle.prioridad || '-' }}</div>
          <div><strong>Responsable:</strong> {{ detalle.nombreResponsable || '-' }}</div>
          <div><strong>Canal:</strong> {{ detalle.canalOrigen }}</div>
          <div><strong>Fecha:</strong> {{ detalle.fechaRegistro | date:'dd/MM/yyyy HH:mm' }}</div>
          <div class="full-width"><strong>Descripción:</strong><br>{{ detalle.descripcion }}</div>
          <div class="full-width" *ngIf="detalle.justificacionPrioridad"><strong>Justificación:</strong><br>{{ detalle.justificacionPrioridad }}</div>
        </div>
        <h4>Historial</h4>
        <table class="history-table">
          <thead><tr><th>Fecha</th><th>Acción</th><th>Usuario</th><th>Observación</th></tr></thead>
          <tbody>
            <tr *ngFor="let h of detalle.historial">
              <td>{{ h.fechaHora | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>{{ h.accion }}</td>
              <td>{{ h.nombreUsuario }}</td>
              <td>{{ h.observacion }}</td>
            </tr>
            <tr *ngIf="detalle.historial.length === 0"><td colspan="4" class="empty">Sin historial</td></tr>
          </tbody>
        </table>
        <div class="modal-actions">
          <button (click)="detalle = null" class="btn-cancel">Cerrar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .header-right { display: flex; align-items: center; gap: .8rem; }
    .count { color: #888; font-size: .85rem; }
    .header-bar select { padding: .4rem .6rem; border-radius: 6px; border: 1px solid #ddd; font-size: .9rem; }
    .table-wrapper { background: white; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.08); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .7rem .8rem; text-align: left; border-bottom: 1px solid #f0f0f0; font-size: .9rem; }
    th { background: #fafafa; font-weight: 600; color: #555; font-size: .8rem; text-transform: uppercase; letter-spacing: .5px; }
    tr:last-child td { border-bottom: none; }
    .badge { padding: .2rem .6rem; border-radius: 12px; font-size: .8rem; font-weight: 500; }
    .REGISTRADA { background: #e3f2fd; color: #1565c0; }
    .CLASIFICADA { background: #f3e5f5; color: #7b1fa2; }
    .EN_ATENCION { background: #fff3e0; color: #e65100; }
    .ATENDIDA { background: #e8f5e9; color: #2e7d32; }
    .CERRADA { background: #eceff1; color: #546e7a; }
    .actions-cell { display: flex; gap: .3rem; flex-wrap: wrap; }
    .btn-sm { padding: .3rem .6rem; border: 1px solid #1976d2; background: #1976d2; color: white; border-radius: 4px; cursor: pointer; font-size: .8rem; transition: opacity .2s; }
    .btn-sm:hover { opacity: .85; }
    .btn-outline { background: white; color: #555; border-color: #bbb; }
    .btn-outline:hover { background: #f5f5f5; opacity: 1; }
    .empty { text-align: center; color: #999; padding: 2rem; font-style: italic; }
    .loading, .error { text-align: center; padding: 2rem; }
    .error { color: #d32f2f; background: #fff5f5; border-radius: 8px; border: 1px solid #ffcdd2; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; padding: 1.5rem; border-radius: 12px; min-width: 380px; max-width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,.2); }
    .modal-wide { min-width: 600px; }
    .modal h3 { margin: 0 0 1rem; font-size: 1.1rem; }
    .modal h4 { margin: 1rem 0 .5rem; font-size: .95rem; color: #555; }
    .field { margin-bottom: 1rem; }
    .field label { display: block; margin-bottom: .3rem; font-weight: 600; color: #555; font-size: .9rem; }
    .field select, .field textarea { width: 100%; padding: .5rem; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: .9rem; }
    .field textarea { resize: vertical; }
    .modal-actions { display: flex; gap: .5rem; margin-top: 1rem; }
    .btn-primary { padding: .5rem 1.2rem; background: #1976d2; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
    .btn-cancel { padding: .5rem 1.2rem; background: #e0e0e0; color: #333; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; }
    .action-error { color: #d32f2f; margin-top: .8rem; font-size: .9rem; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; margin-bottom: .5rem; font-size: .9rem; }
    .full-width { grid-column: 1 / -1; }
    .history-table { width: 100%; border-collapse: collapse; font-size: .85rem; }
    .history-table th { background: #fafafa; padding: .4rem .6rem; text-align: left; font-size: .8rem; color: #555; }
    .history-table td { padding: .4rem .6rem; border-bottom: 1px solid #f0f0f0; }
  `]
})
export class SolicitudList implements OnInit {
  private readonly solicitudService = inject(SolicitudService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  solicitudes: SolicitudResponse[] = [];
  profesores: UsuarioResponse[] = [];
  loading = true;
  error = '';
  filtroEstado = '';

  formAccion: string | null = null;
  accionData: any = {};
  solicitudSeleccionada: SolicitudResponse | null = null;
  cargandoAccion = false;
  errorAccion = '';
  detalle: SolicitudResponse | null = null;

  estados = ESTADOS_SOLICITUD;
  tipos = TIPOS_SOLICITUD;
  labelsTipo = TIPO_LABELS;
  prioridades = PRIORIDADES;
  labelsPrioridad = PRIORIDAD_LABELS;

  ngOnInit(): void {
    this.cargar();
    this.route.paramMap.subscribe(() => this.cargar());
  }

  esCoordinador(): boolean {
    return this.auth.hasRole('ROLE_COORDINADOR');
  }

  esResponsable(s: SolicitudResponse): boolean {
    return s.responsableId === this.auth.getUserId();
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    const obs = this.filtroEstado
      ? this.solicitudService.listarPorEstado(this.filtroEstado)
      : this.solicitudService.listar();
    obs.subscribe({
      next: data => { this.solicitudes = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar solicitudes. ¿El backend está corriendo?'; this.loading = false; }
    });
  }

  cargarProfesores(): void {
    this.usuarioService.listar().subscribe(data => {
      this.profesores = data.filter(u => u.rol === 'PROFESOR' && u.estado === 'ACTIVO');
    });
  }

  abrirForm(s: SolicitudResponse, accion: string): void {
    this.solicitudSeleccionada = s;
    this.formAccion = accion;
    this.accionData = {};
    this.errorAccion = '';
  }

  cerrarForm(): void {
    this.formAccion = null;
    this.solicitudSeleccionada = null;
    this.accionData = {};
    this.errorAccion = '';
  }

  get tituloAccion(): string {
    const map: Record<string, string> = {
      clasificar: 'Clasificar Solicitud', priorizar: 'Priorizar Solicitud',
      asignar: 'Asignar Responsable', atender: 'Atender Solicitud', cerrar: 'Cerrar Solicitud'
    };
    return map[this.formAccion ?? ''] ?? '';
  }

  private accionOk(): void { this.cerrarForm(); this.cargar(); }
  private accionError(e: any): void { this.errorAccion = e.error?.message || 'Error en la operación'; this.cargandoAccion = false; }

  ejecutarClasificar(): void {
    this.cargandoAccion = true;
    this.solicitudService.clasificar(this.solicitudSeleccionada!.id, {
      tipo: this.accionData.tipo, coordinadorId: this.auth.getUserId()!
    }).subscribe({ next: () => this.accionOk(), error: e => this.accionError(e) });
  }

  ejecutarPriorizar(): void {
    this.cargandoAccion = true;
    this.solicitudService.priorizar(this.solicitudSeleccionada!.id, {
      prioridad: this.accionData.prioridad, justificacion: this.accionData.justificacion,
      coordinadorId: this.auth.getUserId()!
    }).subscribe({ next: () => this.accionOk(), error: e => this.accionError(e) });
  }

  ejecutarAsignar(): void {
    this.cargandoAccion = true;
    this.solicitudService.asignarResponsable(this.solicitudSeleccionada!.id, {
      responsableId: this.accionData.responsableId, coordinadorId: this.auth.getUserId()!
    }).subscribe({ next: () => this.accionOk(), error: e => this.accionError(e) });
  }

  ejecutarAtender(): void {
    this.cargandoAccion = true;
    this.solicitudService.atender(this.solicitudSeleccionada!.id, {
      responsableId: this.auth.getUserId()!, observacion: this.accionData.observacion
    }).subscribe({ next: () => this.accionOk(), error: e => this.accionError(e) });
  }

  ejecutarCerrar(): void {
    this.cargandoAccion = true;
    this.solicitudService.cerrar(this.solicitudSeleccionada!.id, {
      responsableId: this.auth.getUserId()!, observacionCierre: this.accionData.observacionCierre
    }).subscribe({ next: () => this.accionOk(), error: e => this.accionError(e) });
  }

  verDetalle(s: SolicitudResponse): void {
    this.solicitudService.obtener(s.id).subscribe(data => this.detalle = data);
  }
}

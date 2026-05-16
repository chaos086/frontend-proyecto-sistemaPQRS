import type { CanalOrigen, EstadoSolicitud, Prioridad, TipoSolicitud } from './enums';

export interface EntradaHistorialResponse {
  id: string;
  fechaHora: string;
  accion: string;
  usuarioId: string;
  nombreUsuario: string;
  observacion: string;
}

export interface SolicitudResponse {
  id: string;
  solicitanteId: string;
  nombreSolicitante: string;
  canalOrigen: string;
  fechaRegistro: string;
  tipoSolicitud: string;
  descripcion: string;
  prioridad: string;
  justificacionPrioridad: string;
  estado: string;
  responsableId: string;
  nombreResponsable: string;
  historial: EntradaHistorialResponse[];
}

export interface CrearSolicitudRequest {
  solicitanteId: string;
  nombreSolicitante: string;
  canalOrigen: CanalOrigen;
  descripcion: string;
}

export interface ClasificarRequest {
  tipo: TipoSolicitud;
  coordinadorId: string;
}

export interface PriorizarRequest {
  prioridad: Prioridad;
  justificacion: string;
  coordinadorId: string;
}

export interface AsignarResponsableRequest {
  responsableId: string;
  coordinadorId: string;
}

export interface AtenderRequest {
  responsableId: string;
  observacion?: string;
}

export interface CerrarRequest {
  responsableId: string;
  observacionCierre: string;
}

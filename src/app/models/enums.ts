export type Rol = 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRATIVO' | 'COORDINADOR';
export const ROLES: Rol[] = ['ESTUDIANTE', 'PROFESOR', 'ADMINISTRATIVO', 'COORDINADOR'];
export const ROL_LABELS: Record<Rol, string> = {
  ESTUDIANTE: 'Estudiante', PROFESOR: 'Profesor',
  ADMINISTRATIVO: 'Administrativo', COORDINADOR: 'Coordinador'
};

export type EstadoUsuario = 'ACTIVO' | 'INACTIVO';

export type TipoSolicitud = 'QUEJA' | 'RECLAMO' | 'SUGERENCIA' | 'PETICION' | 'FELICITACION';
export const TIPOS_SOLICITUD: TipoSolicitud[] = ['QUEJA', 'RECLAMO', 'SUGERENCIA', 'PETICION', 'FELICITACION'];
export const TIPO_LABELS: Record<TipoSolicitud, string> = {
  QUEJA: 'Queja', RECLAMO: 'Reclamo', SUGERENCIA: 'Sugerencia',
  PETICION: 'Petición', FELICITACION: 'Felicitación'
};

export type EstadoSolicitud = 'REGISTRADA' | 'CLASIFICADA' | 'EN_ATENCION' | 'ATENDIDA' | 'CERRADA';
export const ESTADOS_SOLICITUD: EstadoSolicitud[] = ['REGISTRADA', 'CLASIFICADA', 'EN_ATENCION', 'ATENDIDA', 'CERRADA'];

export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA';
export const PRIORIDADES: Prioridad[] = ['BAJA', 'MEDIA', 'ALTA'];
export const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta'
};

export type CanalOrigen = 'PRESENCIAL' | 'TELEFONICO' | 'CORREO_ELECTRONICO' | 'APLICACION_WEB' | 'APLICACION_MOVIL';
export const CANALES_ORIGEN: CanalOrigen[] = ['PRESENCIAL', 'TELEFONICO', 'CORREO_ELECTRONICO', 'APLICACION_WEB', 'APLICACION_MOVIL'];
export const CANAL_LABELS: Record<CanalOrigen, string> = {
  PRESENCIAL: 'Presencial', TELEFONICO: 'Telefónico',
  CORREO_ELECTRONICO: 'Correo Electrónico', APLICACION_WEB: 'Aplicación Web',
  APLICACION_MOVIL: 'Aplicación Móvil'
};

export type AccionHistorial = 'REGISTRAR_SOLICITUD' | 'CLASIFICAR_SOLICITUD' | 'PRIORIZAR_SOLICITUD' | 'ASIGNAR_RESPONSABLE' | 'MARCAR_ATENDIDA' | 'CERRAR_SOLICITUD';

import type { EstadoUsuario, Rol } from './enums';

export interface UsuarioResponse {
  id: string;
  nombre: string;
  rol: string;
  email: string;
  estado: string;
}

export interface CrearUsuarioRequest {
  nombre: string;
  rol: Rol;
  email: string;
}

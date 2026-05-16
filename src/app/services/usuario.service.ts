import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { CrearUsuarioRequest, UsuarioResponse } from '../models/usuario.models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/usuarios';

  crear(request: CrearUsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.apiUrl, request);
  }

  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.apiUrl);
  }

  obtener(id: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/${id}`);
  }

  activar(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/activar`, {});
  }

  desactivar(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }
}

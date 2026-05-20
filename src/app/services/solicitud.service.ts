import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { PageResponse } from '../models/page-response.model';
import type {
  SolicitudResponse,
  CrearSolicitudRequest,
  ClasificarRequest,
  PriorizarRequest,
  AsignarResponsableRequest,
  AtenderRequest,
  CerrarRequest,
  EntradaHistorialResponse,
} from '../models/solicitud.models';

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/solicitudes';

  crear(request: CrearSolicitudRequest): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.apiUrl, request);
  }

  listar(): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(this.apiUrl);
  }

  listarPaginado(page: number, size: number): Observable<PageResponse<SolicitudResponse>> {
    return this.http.get<PageResponse<SolicitudResponse>>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

  obtener(id: string): Observable<SolicitudResponse> {
    return this.http.get<SolicitudResponse>(`${this.apiUrl}/${id}`);
  }

  listarPorEstado(estado: string): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.apiUrl}/estado/${estado}`);
  }

  listarPorSolicitante(solicitanteId: string): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.apiUrl}/solicitante/${solicitanteId}`);
  }

  clasificar(id: string, request: ClasificarRequest): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}/clasificar`, request);
  }

  priorizar(id: string, request: PriorizarRequest): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}/priorizar`, request);
  }

  asignarResponsable(id: string, request: AsignarResponsableRequest): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}/asignar-responsable`, request);
  }

  atender(id: string, request: AtenderRequest): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}/atender`, request);
  }

  cerrar(id: string, request: CerrarRequest): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/${id}/cerrar`, request);
  }

  obtenerHistorial(id: string): Observable<EntradaHistorialResponse[]> {
    return this.http.get<EntradaHistorialResponse[]>(`${this.apiUrl}/${id}/historial`);
  }
}

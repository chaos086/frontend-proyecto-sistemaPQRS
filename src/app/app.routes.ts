import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'solicitudes', loadComponent: () => import('./components/solicitud-list/solicitud-list').then(m => m.SolicitudList) },
      { path: 'crear-solicitud', loadComponent: () => import('./components/crear-solicitud/crear-solicitud').then(m => m.CrearSolicitud) },
      { path: 'usuarios', loadComponent: () => import('./components/usuario-list/usuario-list').then(m => m.UsuarioList), canActivate: [roleGuard(['ROLE_COORDINADOR'])] },
      { path: 'crear-usuario', loadComponent: () => import('./components/crear-usuario/crear-usuario').then(m => m.CrearUsuario), canActivate: [roleGuard(['ROLE_COORDINADOR'])] },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/inicio' }
];

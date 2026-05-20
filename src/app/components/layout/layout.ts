import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <div class="nav-brand">
          <a routerLink="/solicitudes">PQRS</a>
        </div>
        <div class="nav-links">
          <a routerLink="/solicitudes" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Solicitudes</a>
          <a routerLink="/crear-solicitud" routerLinkActive="active">Nueva Solicitud</a>
          <a routerLink="/usuarios" routerLinkActive="active">Usuarios</a>
          <a routerLink="/crear-usuario" routerLinkActive="active">Nuevo Usuario</a>
          <span class="nav-divider"></span>
          <span class="user-role">{{ getUserLabel() }}</span>
          <button class="btn-logout" (click)="logout()">Cerrar sesión</button>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet />
    </main>
    <footer class="footer">
      <p>Universidad del Quindío - Sistema PQRS &copy; {{ year }}</p>
    </footer>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1565c0, #0d47a1);
      color: white; box-shadow: 0 2px 8px rgba(0,0,0,.15); position: sticky; top: 0; z-index: 100;
    }
    .nav-inner {
      display: flex; justify-content: space-between; align-items: center;
      max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; height: 56px;
    }
    .nav-brand a { color: white; font-weight: 700; font-size: 1.3rem; text-decoration: none; letter-spacing: 1px; }
    .nav-links { display: flex; align-items: center; gap: .2rem; }
    .nav-links a {
      color: rgba(255,255,255,.8); text-decoration: none; font-size: .9rem;
      padding: .4rem .8rem; border-radius: 4px; transition: background .2s, color .2s;
    }
    .nav-links a:hover { background: rgba(255,255,255,.1); color: white; text-decoration: none; }
    .nav-links a.active { background: rgba(255,255,255,.2); color: white; font-weight: 600; }
    .nav-divider { width: 1px; height: 24px; background: rgba(255,255,255,.3); margin: 0 .5rem; }
    .user-role { font-size: .8rem; opacity: .8; margin-left: .5rem; }
    .btn-logout {
      background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.3);
      color: white; padding: .35rem .75rem; border-radius: 4px; cursor: pointer; font-size: .8rem;
      transition: background .2s;
    }
    .btn-logout:hover { background: rgba(255,255,255,.25); }
    .main-content {
      padding: 1.5rem; max-width: 1200px; margin: 0 auto;
      min-height: calc(100vh - 56px - 50px);
    }
    .footer {
      background: #1a1a2e; color: rgba(255,255,255,.6); text-align: center;
      padding: .8rem; font-size: .8rem; height: 50px;
    }
    .footer p { margin: 0; }
  `]
})
export class Layout {
  private readonly auth = inject(AuthService);
  year = new Date().getFullYear();

  getUserLabel(): string {
    const roles = this.auth.getUserRoles();
    if (roles.length === 0) return '';
    return roles.map(r => r.replace('ROLE_', '')).join(', ');
  }

  logout(): void {
    this.auth.logout();
    window.location.href = '/login';
  }
}

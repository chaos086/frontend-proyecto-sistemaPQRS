# Estilos Usados - Sistema PQRS

## 1. Paleta de Colores

### Tonos Púrpura (Marca principal)
| Variable CSS | Hex | Uso |
|---|---|---|
| `--purple-900` | `#2E1065` | Fondo sidebar (inicio degradado) |
| `--purple-800` | `#3B0764` | - |
| `--purple-700` | `#5B21B6` | Fondo sidebar (mitad degradado) |
| `--purple-600` | `#6D28D9` | Botones primarios, badges, enlaces, gradiente botones |
| `--purple-500` | `#7C3AED` | Focus inputs, hover borders |
| `--purple-400` | `#8B5CF6` | - |
| `--purple-100` | `#EDE9FE` | Fondo icono stats, badges, help icon |

### Gradiente Sidebar
```css
background: linear-gradient(180deg, #2E1065 0%, #5B21B6 50%, #4F46E5 100%);
```

### Gradiente Botones Primarios
```css
background: linear-gradient(135deg, #6D28D9, #4F46E5);
```

### Tonos Slate (Grises - Textos y bordes)
| Variable CSS | Hex | Uso |
|---|---|---|
| `--slate-50` | `#F8FAFC` | Fondo headers de tabla |
| `--slate-100` | `#F1F5F9` | Bordes cards, fondo botón cancelar |
| `--slate-200` | `#E2E8F0` | Bordes inputs y tablas |
| `--slate-300` | `#CBD5E1` | Scrollbar thumb |
| `--slate-400` | `#94A3B8` | Texto secundario, empty state |
| `--slate-500` | `#64748B` | Texto subtítulo, meta, muted |
| `--slate-600` | `#475569` | Labels formularios |
| `--slate-700` | `#334155` | - |
| `--slate-800` | `#1E293B` | - |
| `--slate-900` | `#0F172A` | - |

### Colores de Estado (Badges)
| Estado | Fondo | Texto |
|---|---|---|
| Registrada / Pendiente | `#FEF3C7` | `#D97706` |
| Clasificada | `#DBEAFE` | `#2563EB` |
| En Atención / Proceso | `#E0E7FF` | `#4F46E5` |
| Atendida / Resuelta | `#D1FAE5` | `#059669` |
| Cerrada | `#F1F5F9` | `#64748B` |

### Colores de Stats Cards
| Card | Fondo Icono | Texto Valor |
|---|---|---|
| Total PQRS | `#EDE9FE` (púrpura) | `#6D28D9` |
| Pendientes | `#FEF3C7` (amarillo) | `#D97706` |
| En Proceso | `#E0E7FF` (índigo) | `#4F46E5` |
| Resueltas | `#D1FAE5` (verde) | `#059669` |

### Generales
| Elemento | Color |
|---|---|
| Fondo página (`--bg-body`) | `#F5F7FB` |
| Texto principal (`--text-primary`) | `#111827` |
| Títulos (`#1E1B4B`) | Índigo oscuro |
| Blanco | `#FFFFFF` |
| Error textos | `#DC2626` |
| Error fondos | `#FEE2E2` |
| Success textos | `#059669` |
| Success fondos | `#D1FAE5` |

---

## 2. Sombras

| Variable | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Cards, tablas |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Notificaciones, user-card |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Hover cards |
| (sidebar) | `4px 0 24px rgba(0,0,0,.15)` | Sombra lateral del sidebar |
| (login) | `0 8px 40px rgba(0,0,0,.25)` | Card de login |
| (modal) | `0 16px 48px rgba(0,0,0,.2)` | Modales |

---

## 3. Medidas y Espaciados

### Sidebar
- Ancho: `290px` (variable `--sidebar-width`)
- Padding interno: `1.5rem`
- Altura: `100vh`
- Posición: `sticky`, `top: 0`

### Logo Box (sidebar)
- Tamaño: `96px × 96px`
- Borde radio: `16px`
- Sombra: `0 8px 24px rgba(0,0,0,.2)`
- Texto "UQ": `2.8rem`, `font-weight: 900`

### Topbar
- Padding: `1.5rem 2rem`
- Saludo: `1.8rem`
- Avatar: `48px × 48px`

### Stats Cards
- Ancho: `grid-template-columns: repeat(4, 1fr)`
- Gap: `1.5rem`
- Padding interno: `1.5rem`
- Radio borde: `24px`
- Icono: `80px × 80px`, radio `16px`
- Valor número: `2.8rem`, `font-weight: 900`

### Tablas
- Radio borde wrapper: `16px`
- Padding celdas: `1rem 1.2rem`
- Badge radio: `999px` (pill)
- Badge padding: `.3rem .8rem` / `.4rem .9rem`

### Cards (secciones)
- Radio borde: `24px`
- Padding: `2rem`
- Borde: `1px solid var(--slate-100)`

### Botones
| Botón | Padding | Radio borde |
|---|---|---|
| Primario (gradiente) | `.6rem 1.2rem` / `.9rem 1.8rem` | `12px` / `16px` |
| Outline | `.7rem 1.2rem` | `16px` |
| Acción tabla | `.3rem .7rem` | `8px` |
| Cancelar | `.6rem 1.5rem` | `12px` |
| Logout sidebar | `1rem 1.2rem` | `16px` |
| Cerrar sesión | `1rem 1.2rem` | `16px` |

### Inputs / Selects
- Padding: `.6rem`
- Radio borde: `12px`
- Focus: `border-color: var(--purple-500)` + `box-shadow: 0 0 0 3px rgba(124,58,237,.1)`

### Login Card
- Max-width: `420px`
- Padding: `2.5rem`
- Radio borde: `24px`
- Logo box: `72px × 72px`, radio `18px`

### Modales
- Min-width: `400px`
- Padding: `2rem`
- Radio borde: `24px`
- Overlay: `backdrop-filter: blur(4px)`

---

## 4. Ubicación de Archivos

### Estilos Globales
- `src/app/app.css` — Variables CSS (`:root`), resets, scrollbar, colores globales
- Importado desde `src/styles.css` mediante `@import './app.css'`

### Layout (Sidebar + Header)
- `src/app/components/layout/layout.ts`
  - Sidebar: `<aside class="sidebar">`
  - Topbar: `<header class="topbar">`
  - Content: `<main class="content">`
  - Footer: `<footer class="footer">`

### Dashboard (Inicio)
- `src/app/components/dashboard/dashboard.ts`
  - Stats cards: `<section class="stats-grid">`
  - Tabla recientes: `<section class="card table-section">`
  - Gráfico: `<div class="chart-bars">`
  - Ayuda: `<section class="lower-grid">`

### Login
- `src/app/components/login/login.ts`
  - Contenedor: `.login-container` (gradiente púrpura)
  - Card: `.login-card`
  - Logo: `.login-logo-box`

### Solicitudes
- `src/app/components/solicitud-list/solicitud-list.ts`
  - Card: `.page-card`
  - Tabla con acciones y modales

### Usuarios
- `src/app/components/usuario-list/usuario-list.ts`
  - Card: `.page-card`
  - Tabla con activar/desactivar

### Formularios
- `src/app/components/crear-solicitud/crear-solicitud.ts` — Card: `.card-form`
- `src/app/components/crear-usuario/crear-usuario.ts` — Card: `.card-form`

---

## 5. Tipografía

- Fuente principal: `'Segoe UI', system-ui, -apple-system, sans-serif`
- Definida en `app.css` en `html, body`
- Tamaños comunes:
  - `.brand-title` (sidebar): `2.2rem`, `font-weight: 800`
  - `.greeting` (topbar): `1.8rem`, `font-weight: 700`
  - `.section-title` (cards): `1.5rem`, `font-weight: 700`
  - `.stat-value`: `2.8rem`, `font-weight: 900`
  - `.stat-title`: `1.1rem`, `font-weight: 700`
  - Texto cuerpo: `.9rem`
  - Texto secundario: `.8rem`

---

## 6. Cómo Cambiar el Logo "UQ" por una Imagen

Actualmente el logo en el sidebar son las iniciales "UQ" dentro de un cuadrado blanco:

```html
<!-- Ubicación: src/app/components/layout/layout.ts (línea ~26) -->
<div class="logo-box">
  <span class="logo-text">UQ</span>
</div>
```

Para reemplazarlo con una imagen:

### Paso 1 — Colocar la imagen
Pon el archivo (ej. `logo-uniquindio.png`) en cualquiera de estas carpetas:

| Carpeta | URL resultante |
|---|---|
| `public/` | `favicon.ico`, `/logo-uniquindio.png` |
| `src/assets/` | `/assets/logo-uniquindio.png` |

Recomendación: usa `src/assets/` para imágenes del logo.

### Paso 2 — Reemplazar en el template
Cambia el HTML del logo-box por:

```html
<div class="logo-box">
  <img src="assets/logo-uniquindio.png" alt="Universidad del Quindío" class="logo-img" />
</div>
```

### Paso 3 — Estilos para la imagen
Agrega en el `styles` del layout:

```css
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
}
```

### Paso 4 — Build y verificación
```bash
npm run build
```

La imagen se copiará automáticamente al `dist/` porque `src/assets` está configurado en `angular.json`.

### Alternativa: Cambiar solo el color/forma del "UQ"
Si prefieres mantener el texto pero con otro estilo, modifica en `app.css` o en los estilos del layout:

```css
.logo-box {
  background: white;          /* o cualquier otro color */
  border-radius: 16px;       /* o 50% para círculo */
}
.logo-text {
  color: #5B21B6;            /* color del texto UQ */
  font-size: 2.8rem;
  font-weight: 900;
}
```

---

## 7. Notas Adicionales

- Todas las medidas están en `rem` y `px`. Valores en `rem` escalan con el tamaño de fuente del navegador (1rem = 16px por defecto).
- Los `border-radius` altos (24px) son característicos del diseño moderno tipo dashboard.
- Las transiciones usan `transition: all .25s ease` o `transition: box-shadow .3s, transform .3s` en cards.
- El sidebar usa `position: sticky; top: 0` para mantenerse visible al hacer scroll sin los problemas de `position: fixed`.

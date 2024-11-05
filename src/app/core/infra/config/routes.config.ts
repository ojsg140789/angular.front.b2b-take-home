export const ROUTE_CONFIG = {
  login: { path: 'auth', label: 'Iniciar sesión', icon: 'fas fa-sign-in-alt' },
  app: { path: 'apz', label: 'Aplicación', icon: 'fas fa-th-large' },
  home: { path: 'home', label: 'Inicio', icon: 'fas fa-home' },
  historial: { path: 'historial', label: 'Historial', icon: 'fas fa-history' }
} as const;

export type RouteKey = keyof typeof ROUTE_CONFIG;
export type Route = (typeof ROUTE_CONFIG)[RouteKey];

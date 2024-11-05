import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { ROUTE_CONFIG } from '../infra/config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class RouteTitleService {
  private readonly routeTitles: Record<string, string> = {
    [`/${ROUTE_CONFIG.home.path}`]: 'Inicio',
    [`/${ROUTE_CONFIG.historial.path}`]: 'Historial'
  };

  private titleSubject = new BehaviorSubject<string>('Layout Principal');
  public title$ = this.titleSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
    this.updateTitle();
  }

  private updateTitle(): void {
    const currentRoute = this.router.url;
    const matchedTitle = Object.keys(this.routeTitles).find(route => currentRoute.includes(route));
    this.titleSubject.next(matchedTitle ? this.routeTitles[matchedTitle] : 'Layout Principal');
  }
}

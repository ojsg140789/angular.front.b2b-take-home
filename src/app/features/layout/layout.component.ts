import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';
import { CommonModule } from '@angular/common';
import { RouteTitleService } from '../../core/services/route-title.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    CommonModule,
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent {
  readonly #router = inject(Router);

  readonly appRoutes = ROUTE_CONFIG;
  
  public pageTitle$ = inject(RouteTitleService).title$;

  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.home]);
  }
}

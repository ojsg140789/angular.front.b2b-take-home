import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aplz-summary',
  template: `
    <div class="summary-container">
      <div class="summary-item">
        <span class="summary-label">TOTAL DE VENTAS</span>
        <span class="summary-value">{{ totalSales | currency }}</span>
      </div>
      <div class="divider"></div>
      <div class="summary-item">
        <span class="summary-label">NÚMERO DE PEDIDOS</span>
        <span class="summary-value">{{ orderCount }}</span>
      </div>
      <div class="divider"></div>
      <div class="summary-item">
        <span class="summary-label">TICKET PROMEDIO</span>
        <span class="summary-value">{{ averageTicket | currency }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./aplazo-summary.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AplazoSummaryComponent {
  @Input() totalSales: number = 0;
  @Input() orderCount: number = 0;
  @Input() averageTicket: number = 0;
}

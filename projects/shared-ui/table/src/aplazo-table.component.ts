import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOperation } from '../../../../src/app/core/domain/entities/order-operation';

@Component({
  selector: 'aplz-table',
  template: `
    <div class="table-container">
      <div class="table-scroll-container">
        <table>
          <thead>
            <tr>
              <th>NÚMERO DE PEDIDO</th>
              <th>FECHA</th>
              <th>ESTADO</th>
              <th>MONTOS</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data">
              <td>
                {{ item.loanId }}
              </td>
              <td>
                {{ item.updatedAt | date : 'dd/MM/yy, HH:mm' }}
              </td>
              <td>
                <span [ngClass]="item.status === 'Activo' ? 'status-approved': 'status-not-approved'">
                  {{ item.status === 'Activo' ? 'APROBADO' : 'NO APROBADO' }}
                </span>
              </td>
              <td>
                {{ item.price | currency }}
              </td>
              <td class="text-center">
                <span class="action-button">Ver</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./aplazo-table.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AplazoTableComponent {
  @Input() data: OrderOperation[] = [];
}

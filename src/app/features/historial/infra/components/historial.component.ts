import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AplazoTableComponent } from '../../../../../../projects/shared-ui/table/src';
import { OrderService } from '../../../../core/services/order.service';
import { OrderOperation } from '../../../../core/domain/entities/order-operation';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  standalone: true,
  imports: [AplazoTableComponent],
})
export class HistorialComponent implements OnInit {
  private toastr = inject(ToastrService);
  private orderService = inject(OrderService);
  operations: OrderOperation[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchOperations();
  }

  private fetchOperations(): void {
    this.orderService.getOrderOperations().subscribe({
      next: (data) => {
        this.operations = data;
      },
      error: (error) => {
        const errorMsg = error?.error?.message || 'Ocurrió un error inesperado';
        this.toastr.error(errorMsg);
      },
    });
  }
}

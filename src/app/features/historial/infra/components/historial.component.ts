import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AplazoTableComponent } from '../../../../../../projects/shared-ui/table/src';
import { OrderService } from '../../../../core/services/order.service';
import { OrderOperation } from '../../../../core/domain/entities/order-operation';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  standalone: true,
  imports: [FormsModule, AplazoTableComponent],
})
export class HistorialComponent implements OnInit {
  private toastr = inject(ToastrService);
  private orderService = inject(OrderService);
  operations: OrderOperation[] = [];
  filteredOperations: OrderOperation[] = [];
  startDate: string | null = null;
  endDate: string | null = null;
  operationCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.fetchOperations();
  }

  fetchOperations(): void {
    this.orderService.getOrderOperations().subscribe({
      next: (data) => {
        this.operations = data;
        this.filteredOperations = data;
        this.updateOperationCount();
      },
      error: (error) => {
        const errorMsg = error?.error?.message || 'Ocurrió un error inesperado';
        this.toastr.error(errorMsg);
      },
    });
  }

  filterByDate(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);
  
      const end = new Date(this.endDate);
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
  
      this.filteredOperations = this.operations.filter(operation => {
        const operationDate = new Date(operation.updatedAt);
        return operationDate >= start && operationDate <= end;
      });
    } else {
      this.filteredOperations = this.operations;
    }
    this.updateOperationCount();
  }

  private updateOperationCount(): void {
    this.operationCount = this.filteredOperations.length;
  }
}

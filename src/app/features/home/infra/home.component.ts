import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AplazoSummaryComponent } from '../../../../../projects/shared-ui/summary/src/aplazo-summary.component';
import { OrderService } from '../../../core/services/order.service';
import { OrderSummary } from '../../../core/domain/entities/order-summary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, AplazoSummaryComponent],
})
export class HomeComponent implements OnInit {
  private toastr = inject(ToastrService);
  private orderService = inject(OrderService);

  summaryData: OrderSummary = {
    totalSales: 0,
    orderCount: 0,
    averageTicket: 0
  };

  branches: number[] = [];
  selectedBranchId: number | undefined;

  constructor() {}

  ngOnInit(): void {
    this.loadOrderSummary();
    this.fetchBranches();
  }

  loadOrderSummary(branchId?: number): void {
    this.orderService.getOrderSummary(branchId).subscribe({
      next: (data) => {
        this.summaryData = data;
      },
      error: (error) => {
        const errorMsg = error?.error?.message || 'Ocurrió un error inesperado';
        this.toastr.error(errorMsg);
      },
    });
  }

  fetchBranches(): void {
    this.orderService.getDistinctBranches().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (error) => {
        const errorMsg = error?.error?.message || 'Ocurrió un error inesperado';
        this.toastr.error(errorMsg);
      },
    });
  }

  onBranchSelect(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const branchId = target.value ? + target.value : undefined;
      this.selectedBranchId = branchId;
      this.loadOrderSummary(branchId);
    }
  }
}

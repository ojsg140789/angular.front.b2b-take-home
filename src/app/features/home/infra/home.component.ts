import { Component } from '@angular/core';
import { AplazoSummaryComponent } from '../../../../../projects/shared-ui/summary/src/aplazo-summary.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [AplazoSummaryComponent]
})
export class HomeComponent {
  summaryData = {
    totalSales: 0,
    orderCount: 0,
    averageTicket: 0
  };
}

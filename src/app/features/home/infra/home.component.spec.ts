import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { OrderService } from '../../../core/services/order.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrderSummary', 'getDistinctBranches']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;

    orderService.getOrderSummary.and.returnValue(of({ totalSales: 100, orderCount: 10, averageTicket: 10 }));
    orderService.getDistinctBranches.and.returnValue(of([1, 2, 3]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order summary on init', () => {
    spyOn(component, 'loadOrderSummary');
    component.ngOnInit();
    expect(component.loadOrderSummary).toHaveBeenCalled();
  });

  it('should load distinct branches on init', () => {
    component.ngOnInit();
    expect(orderService.getDistinctBranches).toHaveBeenCalled();
  });
});

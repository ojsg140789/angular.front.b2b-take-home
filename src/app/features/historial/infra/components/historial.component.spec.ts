import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';
import { OrderService } from '../../../../core/services/order.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistorialComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot() 
      ],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getOrderOperations: jasmine.createSpy('getOrderOperations').and.returnValue(of([{ loanId: 1, status: 'APROBADO', updatedAt: '2024-11-05T07:17:56.534Z', price: 100 }])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load operations on init', () => {
    spyOn(component, 'fetchOperations');
    component.ngOnInit();
    expect(component.fetchOperations).toHaveBeenCalled();
  });
});

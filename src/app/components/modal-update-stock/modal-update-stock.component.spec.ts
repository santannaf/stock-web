import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateStockComponent } from './modal-update-stock.component';

describe('ModalUpdateStockComponent', () => {
  let component: ModalUpdateStockComponent;
  let fixture: ComponentFixture<ModalUpdateStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

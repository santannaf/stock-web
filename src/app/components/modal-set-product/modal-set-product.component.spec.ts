import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetProductComponent } from './modal-set-product.component';

describe('ModalSetProductComponent', () => {
  let component: ModalSetProductComponent;
  let fixture: ComponentFixture<ModalSetProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSetProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ModalProductService } from './modal-product.service';

describe('ModalProductService', () => {
  let service: ModalProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

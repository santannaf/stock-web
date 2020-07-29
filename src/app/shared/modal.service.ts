import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertTypesEnum } from './enums/AlertTypesEnum';
import { ModalProductComponent } from '../components/modal-product/modal-product.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { ModalSetProductComponent } from '../components/modal-set-product/modal-set-product.component';
import { ModalUpdateStockComponent } from '../components/modal-update-stock/modal-update-stock.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: BsModalService) { }

  public showFormProduct(message: string, type: AlertTypesEnum, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(ModalProductComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }

    return (<ModalProductComponent>bsModalRef.content).confirmResult;
  }

  showMessage(message: string, type: AlertTypesEnum, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(ModalMessageComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showMessageSetProduct(message: string, type: AlertTypesEnum, dismissTimeout?: number) {
    console.log('aquiii')
    const bsModalRef: BsModalRef = this.modalService.show(ModalSetProductComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
    return (<ModalSetProductComponent>bsModalRef.content).confirmResult;
  }

  showMessageUpdateStock(message: string, type: AlertTypesEnum, dismissTimeout?: number) {
    console.log('aquiii')
    const bsModalRef: BsModalRef = this.modalService.show(ModalUpdateStockComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
    return (<ModalUpdateStockComponent>bsModalRef.content).confirmResult;
  }
}

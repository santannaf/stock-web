import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  title: string;
  msg: string;
  warningMsg: string = '';
  cancelTxt = 'Cancelar';
  okTxt = 'Salvar';

  confirmResult: Subject<any>;
  formProduct: FormGroup;

  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    this.formProduct = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  onConfirm() {
    if (this.formProduct.valid) {
      const name = this.formProduct.value.name;
      const price = this.formProduct.value.price;
      const product = {
        name, price
      };
      this.confirmAndClose(product);
    }
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: any) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}


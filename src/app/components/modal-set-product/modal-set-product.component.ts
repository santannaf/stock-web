import { tap, catchError, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject, EMPTY } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-modal-set-product',
  templateUrl: './modal-set-product.component.html',
  styleUrls: ['./modal-set-product.component.css']
})
export class ModalSetProductComponent implements OnInit {

  title: string = "Escolha o produto";
  msg: string;
  warningMsg: string = '';
  cancelTxt = 'Cancelar';
  okTxt = 'Escolher';

  products: any[];
  confirmResult: Subject<any>;
  formProductSet: FormGroup;

  private readonly API = `${environment.API}`;

  constructor(private fb: FormBuilder,
    private http: HttpClient, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    this.listProducts().pipe(
      tap(success => this.products = success),
      catchError(error => {
        return EMPTY;
      })
    ).subscribe();
    this.formProductSet = this.fb.group({
      productsToSelection: [null, [Validators.required]]
    });
  }

  listProducts() {
    return this.http.get<any>(`${this.API}/product/all`)
      .pipe(
        take(1)
      )
  }

  onConfirm() {
    if (this.formProductSet.valid) {
      const idProduct = this.formProductSet.value.productsToSelection;
      this.confirmAndClose(idProduct);
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

import { Component, OnInit } from '@angular/core';
import { Subject, EMPTY } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { take, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-modal-update-stock',
  templateUrl: './modal-update-stock.component.html',
  styleUrls: ['./modal-update-stock.component.css']
})
export class ModalUpdateStockComponent implements OnInit {

  title: string;
  msg: string;
  warningMsg: string = '';
  cancelTxt = 'Cancelar';
  okTxt = 'Confirmar';

  products: any[];
  confirmResult: Subject<any>;
  formUpdateStock: FormGroup;

  private readonly API = `${environment.API}`;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    this.listProducts().pipe(
      tap(success => this.products = success),
      catchError(error => {
        return EMPTY;
      })
    ).subscribe();

    this.formUpdateStock = this.fb.group({
      quantity: [null, [Validators.required]],
      idProduct: [null, [Validators.required]]
    });
  }

  listProducts() {
    return this.http.get<any>(`${this.API}/product/all`)
      .pipe(
        take(1)
      )
  }

  onConfirm() {
    if (this.formUpdateStock.valid) {
      const quantity = parseInt(this.formUpdateStock.value.quantity);
      const idProduct = parseInt(this.formUpdateStock.value.idProduct);
      const result = {
        quantity, idProduct
      };
      this.confirmAndClose(result);
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

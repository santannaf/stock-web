import { ModalUpdateStockComponent } from './../components/modal-update-stock/modal-update-stock.component';
import { ModalSetProductComponent } from './../components/modal-set-product/modal-set-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";

import { HeaderComponent } from './../components/header/header.component';
import { ModalProductComponent } from '../components/modal-product/modal-product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalMessageComponent } from './modal-message/modal-message.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [HeaderComponent, ModalProductComponent, ModalMessageComponent, ModalSetProductComponent, ModalUpdateStockComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  exports: [
    HeaderComponent,
    ModalProductComponent,
    ModalSetProductComponent,
    ModalUpdateStockComponent
  ],
  entryComponents: [ModalProductComponent, ModalSetProductComponent, ModalUpdateStockComponent]
})
export class SharedModule { }

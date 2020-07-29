import { Component, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, tap, take, switchMap } from 'rxjs/operators';

import { ModalService } from '../../shared/modal.service';
import { RulesClassification } from './data/response/RulesClassification';
import { CustomStockWithProducts } from './data/response/CustomStockWithProduct';
import { HomeService } from './home.service';
import { AlertTypesEnum } from 'src/app/shared/enums/AlertTypesEnum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stocksWithProducts$: Observable<CustomStockWithProducts[]>;
  error$ = new Subject<boolean>();

  constructor(private homeService: HomeService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.stocksWithProducts$ = this.homeService.listAllStocksCustoms().pipe(
      catchError(error => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  createProduct() {
    const resp$ = this.modalService.showFormProduct("Criar Produto", AlertTypesEnum.INFO);
    resp$.asObservable().pipe(
      take(1),
      tap(
        success => {
          if (!success) return EMPTY;
          this.homeService.createProduct(success).subscribe(
            success => {
              this.modalService.showMessage('Produto criado com sucesso', AlertTypesEnum.SUCCESS, 2000)
            },
            error => {
              this.modalService.showMessage('Error ao criar o produto', AlertTypesEnum.DANGER, 2000)
            }
          )
        }
      )
    ).subscribe();
  }

  loadStock() {
    const resp$ = this.modalService.showMessageSetProduct("Escolher produto para carregamento do estoque", AlertTypesEnum.INFO);
    resp$.asObservable().pipe(
      take(1),
      tap(
        success => {
          if (!success) return EMPTY;
          this.homeService.loadStocks(success).subscribe(
            success => {
              this.modalService.showMessage('Carregamento de estoque concluído', AlertTypesEnum.SUCCESS, 2000);
              this.onRefresh();
            },
            error => {
              this.modalService.showMessage('Falha no carregamento de estoque', AlertTypesEnum.DANGER, 2000)
            }
          )
        }
      )
    ).subscribe();
  }

  updateStock(stock: CustomStockWithProducts) {
    const resp$ = this.modalService.showMessageUpdateStock("Atualizar estoque", AlertTypesEnum.INFO);
    resp$.asObservable().pipe(
      take(1),
      tap(
        success => {
          if (!success) return EMPTY;
          const request = {
            quantity: success.quantity,
            idProduct: success.idProduct,
            idStock: stock.id
          }

          this.homeService.insertProductIntoStock(request).subscribe(
            success => {
              this.modalService.showMessage('Estoque atualizado', AlertTypesEnum.SUCCESS, 2000);
              this.onRefresh();
            },
            error => {
              this.modalService.showMessage('Falha na atualização do estoque', AlertTypesEnum.DANGER, 2000)
            }
          )
        }
      )
    ).subscribe();
  }

  setBackgroundColorByRule(idRule: number) {
    if (idRule == 0 || idRule == 4 || idRule == 1) return RulesClassification.A;
    if (idRule == 1 || idRule == 3 || idRule == 1) return RulesClassification.B;
    if (idRule == 2) return RulesClassification.C;
  }

  handleError() {
    this.error$.next();
  }

}

import { CustomStockWithProducts } from './data/response/CustomStockWithProduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  listAllStocksCustoms() {
    return this.http.get<CustomStockWithProducts[]>(`${this.API}/product/stock/list/customs`)
      .pipe(
        take(1)
      );
  }

  createProduct(body: any) {
    return this.http.post<any>(`${this.API}/product`, body)
      .pipe(
        take(1)
      );
  }

  loadStocks(idProduct: number) {
    return this.http.post<any>(`${this.API}/product/stock/load/with/${idProduct}/product`, {})
      .pipe(
        take(1)
      );
  }

  insertProductIntoStock(body: any) {
    return this.http.post<any>(`${this.API}/product/stock`, body)
      .pipe(
        take(1)
      );
  }

  listProducts() {
    return this.http.get<any>(`${this.API}/product/all`)
      .pipe(
        take(1)
      ).toPromise();
  }
}

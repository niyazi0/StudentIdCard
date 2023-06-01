import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Market} from './model';
@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private Url = 'http://localhost:3000/market';
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Market[]>(this.Url);
  }
}

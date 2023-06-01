import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Food} from './model';
@Injectable({
  providedIn: 'root'
})
export class FoodService {


  private Url = 'http://localhost:3000/foods';
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Food[]>(this.Url);
  }
}

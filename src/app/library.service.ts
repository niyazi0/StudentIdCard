import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookLibrary } from './model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private Url = 'http://localhost:3000/bookLibrary';
  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get<BookLibrary[]>(this.Url);
  }
  getBookById(id: any) {
    const url = `${this.Url}/${id}`;
    return this.http.get<BookLibrary>(url);
  }

  updateBook(book: BookLibrary, id:any) {
    const url = `${this.Url}/${id}`;
    return this.http.patch<BookLibrary>(url, book);
  }
  
}

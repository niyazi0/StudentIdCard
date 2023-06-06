import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Student, Card} from './model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private Url = 'http://localhost:3000/students';


  constructor(private http: HttpClient) { }

getUsers() {
  return this.http.get<Student[]>(this.Url);
}
getUsersLength() {
  
 return this.http.get<Student[]>(this.Url);

}

getUserById(id: any) {
  const url = `${this.Url}/${id}`;
  return this.http.get<Student>(url);
}

createUser(user: Student) {
  return this.http.post<Student>(this.Url, user);
}

updateUser(user: Student, id:any) {
  const url = `${this.Url}/${id}`;
  return this.http.patch<Student>(url, user);
}

deleteUser(id: string) {
  const url = `${this.Url}/${id}`;
  return this.http.delete(url);
}

updateBalance(card: Card, id:any) {
  const url = `${this.Url}/${id}`;
  return this.http.patch<Card>(url,{card:{card}});
}

}


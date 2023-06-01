import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibraryService } from '../../library.service';
import {StudentService} from '../../student.service';
import { Student } from 'src/app/model';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private studentService: StudentService,
  private bookLibraryService:LibraryService,){}


  student:Student= new Student;
  borrows:any[]=[];
  books:any[]=[];
  account:any[]=[];

  ngOnInit() {
    if(this.data.type=='book')
    {
      this.studentService.getUserById(this.data.id)
      .subscribe(response=>{
        this.student=response;
        this.bookLibraryService.getBooks()
        .subscribe(books=>{this.student.borrowedBook.forEach(book=>{
       
            this.books.push(books.find(b=> b.id === book.bookId));
            this.borrows.push(book);  
          
          console.log(this.books);
        });
        })
        
  
      })
    }
    else if (this.data.type=='account')
    {
      this.studentService.getUserById(this.data.id)
      .subscribe(response=>{
        this.account=response.accountDetails;
       
          
          console.log(this.account);
        });
       
        
  
     
    }
  }


  
}

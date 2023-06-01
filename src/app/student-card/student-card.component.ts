import { Component, OnInit  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../student.service';
import {Student} from '../model';
import {MatDialog} from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  card:any;
  students: Student[] = [];

 
  constructor (private studentService: StudentService,
               public dialog: MatDialog
              ){

  }

ngOnInit(){
  this.studentService.getUsers()
  .subscribe(response=>{
    this.students=response;

  })
   
 

}

addStudent()
{
  const dialogRef = this.dialog.open(AddStudentComponent,{
    width:'60%',
    height:'80%',

  });
}

deleteStudent(getId:string)
{
  let bookCount=0;
  this.studentService.getUserById(getId).subscribe(response=>{
    response.borrowedBook.forEach(book=>{
      if(book.returnDate=="")
      {
        bookCount+=1;
      }
    })
    if(bookCount==0)
    {
      if(confirm("Emin misiniz?"))
      {
      this.studentService.deleteUser(getId).subscribe();
      const findIndex=this.students.findIndex(b=> b.id === getId)
      this.students.splice(findIndex, 1)
      alert('Öğrenci Silindi.');
      }
    }
    else{
      alert("Öğrenci kütüphaneden aldığı kitapları teslim etmeden silinemez.")
    }
  })


}

}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'; 
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentLenght:number =0;
  productForm!:any;
  constructor(private formBuilder: FormBuilder, 
              private studentService: StudentService,
              private router: Router
    ){
      
   
    }

ngOnInit(){
   this.studentService.getUsersLength()
  .subscribe(
    data=>{
        this.studentLenght=data[data.length-1].card.id
        this. studentLenght+=1 as number;
  // console.log(this.studentLenght);
  });
  
  this.productForm = new FormGroup({
    id :new FormControl(crypto.randomUUID()),
    name:new FormControl("", Validators.required),
    surname:new FormControl('', Validators.required),
    identityNumber:new FormControl('', Validators.required),
    city:new FormControl('', Validators.required),
    eMail:new FormControl('', [Validators.required,Validators.email]),
    card:new FormControl(),
    borrowedBook:new FormControl([]),
    accountDetails:new FormControl([]),
    foods:new FormControl([]),
  });

  
}

      


  onAdd()
  {
 
      if(this.productForm.valid)
      {
       
  
     this.productForm.value.card=({id:this.studentLenght, cardBalance:"7"})
        // console.log(this.productForm.value); 
      this.studentService.createUser(this.productForm.value).subscribe();
      window.location.reload();
      }
      else
      {
        alert ("Lütfen gerekli alanları doldurunuz.");
      }
  }
  isControlTouched(get:string)
  {

  }
  log(name: any)
  {
    console.log(name)
  }
}

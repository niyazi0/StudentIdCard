import { Component, OnInit, Injectable } from '@angular/core';
import { StudentCardComponent } from '../student-card.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router'
import {FormGroup, FormControl, FormBuilder} from '@angular/forms'; 
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UpdateComponent {

student:any;
name!:string;
productForm!: FormGroup;

id = this.route.snapshot.paramMap.get('id');


constructor(private http:HttpClient,
            private route:ActivatedRoute,
            private formBuilder: FormBuilder,
            private router: Router,
            private studentService:StudentService){
               
           studentService.getUserById(this.id)
           .subscribe(response=>{
            this.student=response;
            this.productForm.patchValue(response);
           })

          };

  ngOnInit() {
    this.productForm = this.formBuilder.group({

      name:[],
      surname:[],
      identityNumber:[],
      city:[],
      eMail:[],
    });
      
  }

  onUpdate(){
    console.log( JSON.stringify(this.productForm.value));
    let user= JSON.stringify(this.productForm.value);
    
    this.studentService.updateUser(this.productForm.value, this.id)
    .subscribe(response=>{
      console.log(response);
    })

     this.router.navigate(['/card']);

  }
}


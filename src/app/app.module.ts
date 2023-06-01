import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { AppRoutingModule } from './app-routing.module';
import { UpdateComponent } from './student-card/update/update.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent, } from './details/dialog/dialog.component';
import { AddStudentComponent } from './student-card/add-student/add-student.component';
@NgModule({

  declarations: [
    AppComponent,
    StudentCardComponent,
    UpdateComponent,
    DetailsComponent,
    DialogComponent,
    AddStudentComponent,



  ],
 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

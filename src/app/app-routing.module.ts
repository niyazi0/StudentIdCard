import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { StudentCardComponent } from './student-card/student-card.component';
import { UpdateComponent } from './student-card/update/update.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes=[
  {path:'card', redirectTo:'', pathMatch:'full'},
  {path:'', component:StudentCardComponent},
  {path:'update/:id', component:UpdateComponent},
  {path:'details/:id', component:DetailsComponent}
]


@NgModule({

  exports:[RouterModule],
  imports: [RouterModule.forRoot(routes)
    
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolDataComponent} from './school-data/school-data.component';


const routes: Routes = [
  {path: '', component: SchoolDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


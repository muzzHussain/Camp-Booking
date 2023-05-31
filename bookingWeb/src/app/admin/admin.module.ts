import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCampComponent } from './add-camp/add-camp.component';
import { ManageCampComponent } from './manage-camp/manage-camp.component';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateCampComponent } from './update-camp/update-camp.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    AddCampComponent,
    ManageCampComponent,
    UpdateCampComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }

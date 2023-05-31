import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component'
import { DashboardComponent } from './admin/dashboard/dashboard.component'
import { SearchComponent } from './search/search.component'
import { ManageCampComponent } from './admin/manage-camp/manage-camp.component'
import { AddCampComponent } from './admin/add-camp/add-camp.component'
import { BookingComponent } from './booking/booking.component'
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component'
import { ManageBookingComponent } from './manage-booking/manage-booking.component'
import { UpdateCampComponent } from './admin/update-camp/update-camp.component';
const routes: Routes = [
  {
    path: 'camp',
    component: ManageCampComponent
  },
  {
    path: 'dashboard',
    component: SearchComponent
  },
  {
    path: 'booking/:id',
    component: BookingComponent
  },
  {
    path: 'updateCamp/:id',
    component: UpdateCampComponent
  },
  {
    path: 'confirmBooking',
    component: ConfirmBookingComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' 
  },
  {
    path: 'manageBooking',
    component: ManageBookingComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Admin/Dashboard',
    component: DashboardComponent
  },
  {
    path: 'addCamps',
    component: AddCampComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

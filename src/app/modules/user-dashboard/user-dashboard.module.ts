import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
  ]
})
export class UserDashboardModule { }
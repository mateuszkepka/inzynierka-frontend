import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { ModuleCardComponent } from './module-card/module-card.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ModuleCardComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
  ]
})
export class UserDashboardModule { }

import {AccordionModule} from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { ModuleCardComponent } from './module-card/module-card.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ModuleCardComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    AccordionModule,
    SharedModule
  ]
})
export class UserDashboardModule { }

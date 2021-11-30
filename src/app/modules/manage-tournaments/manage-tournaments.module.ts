import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ManageTournamentsComponent } from './manage-tournaments.component';
import { ManageTournamentsRoutingModule } from './manage-tournaments-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { ManageTorunamentComponent } from './manage-torunament/manage-torunament.component';

@NgModule({
  declarations: [
    ManageTournamentsComponent,
    ManageTorunamentComponent
  ],
  imports: [
    CommonModule,
    ManageTournamentsRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
  ]
})
export class ManageTournamentsModule { }

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentsComponent } from './tournaments.component';
import { TournamentsRoutingModule } from './tournaments-routing.module';

@NgModule({
  declarations: [
    TournamentsComponent,
    TournamentDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TournamentsRoutingModule,
    TableModule,
    ButtonModule,
    TabViewModule,
  ]
})
export class TournamentsModule { }

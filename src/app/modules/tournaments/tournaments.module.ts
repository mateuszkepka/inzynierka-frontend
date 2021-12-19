import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTournamentAdminComponent } from './add-tournament-admin/add-tournament-admin.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { RegisterForTournamentComponent } from './register-for-tournament/register-for-tournament.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TournamentAdministratorsTabComponent } from './tournament-details/tournament-administrators-tab/tournament-administrators-tab.component';
import { TournamentCompetitorsTabComponent } from './tournament-details/tournament-competitors-tab/tournament-competitors-tab.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentDetailsTabComponent } from './tournament-details/tournament-details-tab/tournament-details-tab.component';
import { TournamentLadderComponent } from './tournament-details/tournament-ladder/tournament-ladder.component';
import { TournamentsComponent } from './tournaments.component';
import { TournamentsRoutingModule } from './tournaments-routing.module';

@NgModule({
  declarations: [
    TournamentsComponent,
    TournamentDetailsComponent,
    TournamentDetailsTabComponent,
    TournamentLadderComponent,
    RegisterForTournamentComponent,
    TournamentCompetitorsTabComponent,
    TournamentAdministratorsTabComponent,
    AddTournamentAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TournamentsRoutingModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    OrganizationChartModule,
    FontAwesomeModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule
  ]
})
export class TournamentsModule { }

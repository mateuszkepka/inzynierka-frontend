import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTournamentAdminComponent } from './add-tournament-admin/add-tournament-admin.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RegisterForTournamentComponent } from './register-for-tournament/register-for-tournament.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TournamentAdministratorsTabComponent } from './tournament-details/tournament-administrators-tab/tournament-administrators-tab.component';
import { TournamentAdministratorsTabModalComponent } from './tournament-details/tournament-administrators-tab/tournament-administrators-tab-modal/tournament-administrators-tab-modal.component';
import { TournamentCompetitorsTabComponent } from './tournament-details/tournament-competitors-tab/tournament-competitors-tab.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { TournamentDetailsTabComponent } from './tournament-details/tournament-details-tab/tournament-details-tab.component';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';
import { TournamentGroupsTabComponent } from './tournament-details/tournament-groups-tab/tournament-groups-tab.component';
import { TournamentLadderComponent } from './tournament-details/tournament-ladder/tournament-ladder.component';
import { TournamentMatchesTabComponent } from './tournament-details/tournament-matches-tab/tournament-matches-tab.component';
import { TournamentsComponent } from './tournaments.component';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [
    TournamentsComponent,
    TournamentDetailsComponent,
    TournamentDetailsTabComponent,
    TournamentLadderComponent,
    RegisterForTournamentComponent,
    TournamentCompetitorsTabComponent,
    TournamentAdministratorsTabComponent,
    AddTournamentAdminComponent,
    TournamentMatchesTabComponent,
    TournamentEditComponent,
    TournamentGroupsTabComponent,
    TournamentAdministratorsTabModalComponent
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
    AutoCompleteModule,
    ProgressSpinnerModule,
    DropdownModule,
    VirtualScrollerModule,
    FileUploadModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
    DynamicDialogModule,
  ]
})
export class TournamentsModule { }

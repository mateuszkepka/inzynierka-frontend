import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InvitePlayersComponent } from './invite-players/invite-players.component';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TeamComponent } from './team.component';
import { TeamPlayersTabComponent } from './team-players-tab/team-players-tab.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
    TeamComponent,
    TeamPlayersTabComponent,
    InvitePlayersComponent,
    EditTeamComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TeamRoutingModule,
    TabViewModule,
    ButtonModule,
    FormlyModule,
    FontAwesomeModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TableModule,
    TagModule,
    FormlyModule,
    FormlyPrimeNGModule,
  ]
})
export class TeamModule { }

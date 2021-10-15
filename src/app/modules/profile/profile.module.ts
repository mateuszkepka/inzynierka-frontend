import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfilePerformanceComponent } from './profile-performance/profile-performance.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSuspensionsComponent } from './profile-suspensions/profile-suspensions.component';
import { ProfileTeamsComponent } from './profile-teams/profile-teams.component';
import { ProfileTournamentsComponent } from './profile-tournaments/profile-tournaments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ProfileDetailsEditComponent } from './profile-details-edit/profile-details-edit.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileSuspensionsComponent,
    ProfileTournamentsComponent,
    ProfileTeamsComponent,
    ProfilePerformanceComponent,
    ProfileDetailsEditComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    TabViewModule,
    TableModule,
    SharedModule,
    ButtonModule
  ]
})
export class ProfileModule { }

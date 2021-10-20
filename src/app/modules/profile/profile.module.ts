import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileDetailsEditComponent } from './profile-details-edit/profile-details-edit.component';
import { ProfilePerformanceComponent } from './profile-performance/profile-performance.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSuspensionsComponent } from './profile-suspensions/profile-suspensions.component';
import { ProfileTeamsComponent } from './profile-teams/profile-teams.component';
import { ProfileTournamentsComponent } from './profile-tournaments/profile-tournaments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';

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
    ButtonModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }

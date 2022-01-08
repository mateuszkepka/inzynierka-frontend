import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { ProfileAccountsComponent } from './profile-accounts/profile-accounts.component';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileDetailsEditComponent } from './profile-details-edit/profile-details-edit.component';
import { ProfileMatchesComponent } from './profile-matches/profile-matches.component';
import { ProfilePerformanceComponent } from './profile-performance/profile-performance.component';
import { ProfileReportModalComponent } from './profile-report-modal/profile-report-modal.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSuspensionsComponent } from './profile-suspensions/profile-suspensions.component';
import { ProfileTeamsComponent } from './profile-teams/profile-teams.component';
import { ProfileTournamentsComponent } from './profile-tournaments/profile-tournaments.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileSuspensionsComponent,
    ProfileTournamentsComponent,
    ProfileTeamsComponent,
    ProfilePerformanceComponent,
    ProfileDetailsEditComponent,
    ProfileAccountsComponent,
    ProfileMatchesComponent,
    ProfileReportModalComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    TabViewModule,
    TableModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    DropdownModule,
    TagModule,
    ProgressSpinnerModule,
    VirtualScrollerModule,
    DynamicDialogModule,
    InputTextareaModule,
    FileUploadModule,
  ],
})
export class ProfileModule { }

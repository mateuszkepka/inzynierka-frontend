import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { MatchChangeDateModalComponent } from './match-change-date-modal/match-change-date-modal.component';
import { MatchResolveComponent } from './match-resolve/match-resolve.component';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchResolveComponent,
    MatchChangeDateModalComponent,
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    ButtonModule,
    TabViewModule,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    CalendarModule,
    FormsModule
  ]
})
export class MatchesModule { }

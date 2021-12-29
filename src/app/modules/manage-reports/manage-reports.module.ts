import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ManageReportDetailsComponent } from './manage-report-details/manage-report-details.component';
import { ManageReportsComponent } from './manage-reports.component';
import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CreateSuspensionModalComponent } from './create-suspension-modal/create-suspension-modal.component';

@NgModule({
  declarations: [
    ManageReportsComponent,
    ManageReportDetailsComponent,
    CreateSuspensionModalComponent,
  ],
  imports: [
    ManageReportsRoutingModule,
    CommonModule,
    SharedModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicDialogModule,
    InputTextareaModule,
    CalendarModule
  ]
})
export class ManageReportsModule { }

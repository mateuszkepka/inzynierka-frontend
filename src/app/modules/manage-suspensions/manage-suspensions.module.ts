import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ManageSuspensionModalComponent } from './manage-suspension-modal/manage-suspension-modal.component';
import { ManageSuspensionsComponent } from './manage-suspensions.component';
import { ManageSusupensionsRoutingModule } from './manage-suspensions-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ManageSuspensionsComponent,
    ManageSuspensionModalComponent
  ],
  imports: [
    ManageSusupensionsRoutingModule,
    CommonModule,
    SharedModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicDialogModule,
    InputTextareaModule,
    CalendarModule
  ]
})
export class ManageSuspensionsModule { }

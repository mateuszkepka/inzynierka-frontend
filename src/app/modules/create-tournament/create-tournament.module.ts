import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { CreateTournamentComponent } from './create-tournament.component';
import { CreateTournamentRoutingModule } from './create-tournament-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [CreateTournamentComponent],
  imports: [
    CreateTournamentRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormlyModule,
    FormsModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    TooltipModule,
  ]
})
export class CreateTournamentModule { }

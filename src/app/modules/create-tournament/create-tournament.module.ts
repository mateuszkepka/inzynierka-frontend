import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CreateTournamentComponent } from './create-tournament.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateTournamentComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class CreateTournamentModule { }

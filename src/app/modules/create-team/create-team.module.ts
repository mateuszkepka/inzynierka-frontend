import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team.component';
import { CreateTeamRoutingModule } from './create-team-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateTeamComponent
  ],
  imports: [
    CommonModule,
    CreateTeamRoutingModule,
    FormlyModule,
    FontAwesomeModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule,
  ]
})
export class CreateTeamModule { }

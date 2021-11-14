import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CreatePlayerComponent } from './create-player.component';
import { CreatePlayerRoutingModule } from './create-player-routing.module';
import { CreateTournamentRoutingModule } from '../create-tournament/create-tournament-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatePlayerComponent
  ],
  imports: [
    CreatePlayerRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class CreatePlayerModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticipationComponent } from './participation.component';
import { ParticipationRoutingModule } from './participation-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ParticipationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ParticipationRoutingModule,
  ]
})
export class ParticipationModule { }

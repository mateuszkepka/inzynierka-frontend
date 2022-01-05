import { CommonModule } from '@angular/common';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchDetailsComponent
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
  ]
})
export class MatchesModule { }

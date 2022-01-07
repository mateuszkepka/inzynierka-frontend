import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    MatchesComponent,
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
  ]
})
export class MatchesModule { }

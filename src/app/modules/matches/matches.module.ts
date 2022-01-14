import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    MatchesComponent,
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    ButtonModule,
    TabViewModule
  ]
})
export class MatchesModule { }

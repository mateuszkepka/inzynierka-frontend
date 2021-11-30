import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    TabViewModule,
  ]
})
export class TeamModule { }

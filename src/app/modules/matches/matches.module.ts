import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { MatchResolveComponent } from './match-resolve/match-resolve.component';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchResolveComponent,
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    ButtonModule,
    TabViewModule,
    ButtonModule,
    FileUploadModule,
  ]
})
export class MatchesModule { }

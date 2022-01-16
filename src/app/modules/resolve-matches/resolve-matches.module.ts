import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResolveMatchesComponent } from './resolve-matches.component';
import { ResolveMatchesRoutingModule } from './resolve-matches-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ResolveMatchesComponent
  ],
  imports: [
    CommonModule,
    ResolveMatchesRoutingModule,
    SharedModule,
    TableModule,
  ]
})
export class ResolveMatchesModule { }

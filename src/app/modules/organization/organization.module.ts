import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationRoutingModule,
  ]
})
export class OrganizationModule { }

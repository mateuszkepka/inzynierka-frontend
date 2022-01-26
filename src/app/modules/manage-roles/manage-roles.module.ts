import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ManageRolesComponent } from './manage-roles.component';
import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ManageRolesComponent
  ],
  imports: [
    ManageRolesRoutingModule,
    CommonModule,
    SharedModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ]
})
export class ManageRolesModule { }

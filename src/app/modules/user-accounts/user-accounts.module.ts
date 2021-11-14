import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { UserAccountsComponent } from './user-accounts.component';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';

@NgModule({
  declarations: [
    UserAccountsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    TableModule,
    SharedModule,
    ButtonModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    UserAccountsRoutingModule
  ]
})
export class UserAccountsModule { }

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { UserInvitationsComponent } from './user-invitations.component';
import { UserInvitationsRoutingModule } from './user-invitations-routing.module';

@NgModule({
  declarations: [
    UserInvitationsComponent
  ],
  imports: [
    CommonModule,
    UserInvitationsRoutingModule,
    SharedModule,
    TabViewModule,
    TableModule,
    ButtonModule
  ]
})
export class UserInvitationsModule { }

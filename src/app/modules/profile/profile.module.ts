import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    TabViewModule,
  ]
})
export class ProfileModule { }

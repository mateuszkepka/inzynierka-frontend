import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    ContactUsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyPrimeNGModule,
    FontAwesomeModule,
    ButtonModule
  ]
})
export class ContactUsModule { }

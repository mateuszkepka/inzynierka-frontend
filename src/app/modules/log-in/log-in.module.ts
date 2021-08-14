import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { LogInComponent } from './log-in.component';
import { LogInRoutingModule } from './log-in-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    LogInRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyPrimeNGModule,
    FontAwesomeModule,
    ButtonModule
  ]
})
export class LogInModule { }

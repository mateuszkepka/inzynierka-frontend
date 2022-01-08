import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyPrimeNGModule,
    FontAwesomeModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    FileUploadModule,
  ]
})
export class RegisterModule { }

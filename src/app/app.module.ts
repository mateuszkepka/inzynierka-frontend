import * as passwordValidation from './validators/password';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentUserState } from './state/current-user.state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyCustomFieldsModule } from './formly-custom-fields/formly-custom-fields.module';
import { FormlyFieldPrimengCalendarComponent } from './formly-custom-fields/calendar/formly-field-primeng-calendar.component';
import { FormlyFieldPrimengDropdownComponent } from './formly-custom-fields/dropdown/formly-field-primeng-dropdown.component';
import { FormlyFieldPrimengFileUploadComponent } from './formly-custom-fields/file-upload/formly-field-primeng-file-upload.component';
import { FormlyFieldPrimengPasswordComponent } from './formly-custom-fields/password/formly-field-primeng-password.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validators: [
        {
          name: `passwordValidator`,
          validation: passwordValidation.passwordValidator
        }
      ],
      validationMessages: [
        { name: `required`, message: `This field is required` },
        { name: `password`, message: passwordValidation.passwordValidatorMessage }
      ],
      types: [
        { name: `datepicker`, component: FormlyFieldPrimengCalendarComponent },
        { name: `dropdown`, component: FormlyFieldPrimengDropdownComponent },
        { name: `fileUpload`, component: FormlyFieldPrimengFileUploadComponent },
        { name: `password`, component: FormlyFieldPrimengPasswordComponent},
      ]
    }),
    FormlyPrimeNGModule,
    FormlyCustomFieldsModule,
    NgxsModule.forRoot([CurrentUserState]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

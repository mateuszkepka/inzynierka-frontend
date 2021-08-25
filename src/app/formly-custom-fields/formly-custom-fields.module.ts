import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from "@angular/common";
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormlyFieldPrimengCalendarComponent } from "./calendar/formly-field-primeng-calendar.component";
import { FormlyFieldPrimengDropdownComponent } from './dropdown/formly-field-primeng-dropdown.component';
import { FormlyFieldPrimengFileUploadComponent } from './file-upload/formly-field-primeng-file-upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        FormlyFieldPrimengCalendarComponent,
        FormlyFieldPrimengDropdownComponent,
        FormlyFieldPrimengFileUploadComponent
    ],
    imports: [
        CommonModule,
        CalendarModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        DropdownModule,
        FileUploadModule,
        ToastModule,
        TabViewModule,
        ButtonModule,
        HttpClientModule
    ],
    exports: [
        FormlyFieldPrimengCalendarComponent
    ]
})
export class FormlyCustomFieldsModule {}

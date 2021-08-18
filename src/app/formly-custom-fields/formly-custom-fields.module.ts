import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from "@angular/common";
import { FormlyFieldPrimengCalendarComponent } from "./calendar/formly-field-primeng-calendar.component";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        FormlyFieldPrimengCalendarComponent,
    ],
    imports: [
        CommonModule,
        CalendarModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    exports: [
        FormlyFieldPrimengCalendarComponent
    ]
})
export class FormlyCustomFieldsModule {}

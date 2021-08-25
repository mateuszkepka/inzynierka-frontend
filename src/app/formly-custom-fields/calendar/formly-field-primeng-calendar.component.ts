import { Component } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
    selector: `app-formly-field-calendar`,
    templateUrl: `./formly-field-primeng-calendar.component.html`,
    styleUrls: [`./formly-field-primeng-calendar.component.scss`]
})
export class FormlyFieldPrimengCalendarComponent extends FieldType {
    date: Date;
}

import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";

import { Calendar } from "primeng/calendar";
import { FieldType } from "@ngx-formly/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: `app-formly-field-calendar`,
    templateUrl: `./formly-field-primeng-calendar.component.html`,
    styleUrls: [`./formly-field-primeng-calendar.component.scss`]
})
export class FormlyFieldPrimengCalendarComponent extends FieldType implements OnInit, OnDestroy {
    @ViewChild(Calendar) calendar: Calendar;
    date: Date;
    x: FormControl;

    sub: Subscription;
    minDate: Date;

    constructor(private readonly cdRef: ChangeDetectorRef) { super();}

    ngOnInit() {
        if (this.field.validators) {
            this.formControl.setValidators(this.field.validators.validation);
        }

    }

    onChange(event) {
        this.cdRef.detectChanges();

    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    setMinDate() {
        if (this.to.minDateField) {
            this.minDate = this.form.controls[this.to.minDateField].value;
            return;
        }

        this.minDate = new Date();
    }
}

import { Component, SimpleChange, SimpleChanges } from "@angular/core";

import { FieldType } from "@ngx-formly/core";

@Component({
    selector: `app-formly-primeng-dropdown`,
    templateUrl: `./formly-field-primeng-dropdown.component.html`,
    styleUrls: [`./formly-field-primeng-dropdown.component.scss`]
})
export class FormlyFieldPrimengDropdownComponent extends FieldType {
    selectedValue: any;
}

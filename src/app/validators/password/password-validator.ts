import { FormControl, ValidationErrors } from "@angular/forms";

export const passwordValidator = (control: FormControl): ValidationErrors =>!control.value ||
        /\w{8,}/.test(control.value) ? null : { password: true };

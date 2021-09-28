import { FormControl, ValidationErrors } from "@angular/forms";

export const passwordValidator = (control: FormControl): ValidationErrors =>{
    console.log(`PASSWORD VALIDATOR`, control);
    return !control.value ||
        /\w{8,}/.test(control.value) ? null : { password: true };

};

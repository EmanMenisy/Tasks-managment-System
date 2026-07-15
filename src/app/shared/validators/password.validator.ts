import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value as string;

    if (!value) return null;

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
  errors['missingUppercase'] = true;
}

if (!/[a-z]/.test(value)) {
  errors['missingLowercase'] = true;
}

if (!/\d/.test(value)) {
  errors['missingDigit'] = true;
}

if (!/[!@#$%^&*]/.test(value)) {
  errors['missingSpecialCharacter'] = true;
}

if (/\s/.test(value)) {
  errors['containsWhitespace'] = true;
}

    return Object.keys(errors).length ? errors : null;
  };
}
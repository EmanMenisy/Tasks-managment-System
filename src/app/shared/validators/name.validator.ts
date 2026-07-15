import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value?.trim();

    if (!value) {
      return null;
    }

    // No numbers
    if (/\d/.test(value)) {
      return { hasNumber: true };
    }

    // No special characters or emojis
    if (!/^[\p{L} ]+$/u.test(value)) {
      return { hasSpecialCharacter: true };
    }

    // No multiple spaces
    if (/\s{2,}/.test(value)) {
      return { multipleSpaces: true };
    }

    return null;
  };
}
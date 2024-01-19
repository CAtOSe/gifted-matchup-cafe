import { AbstractControl, ValidatorFn } from '@angular/forms';

export const minControl =
  (targetControl: AbstractControl<any, any>): ValidatorFn =>
  (control) => {
    if (
      targetControl.value &&
      control.value &&
      Number(targetControl.value) > Number(control.value)
    ) {
      return { minControl: true };
    } else return null;
  };

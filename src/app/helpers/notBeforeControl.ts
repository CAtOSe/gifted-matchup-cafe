import { AbstractControl, ValidatorFn } from '@angular/forms';

export const notBeforeControl =
  (targetControl: AbstractControl<any, any>): ValidatorFn =>
  (control) => {
    if (
      targetControl.value &&
      control.value &&
      targetControl.value > control.value
    ) {
      return {
        notBeforeDate: true,
      };
    } else return null;
  };

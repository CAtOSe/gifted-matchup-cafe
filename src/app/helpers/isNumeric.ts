import { ValidatorFn } from '@angular/forms';

export const isNumeric: ValidatorFn = (control) => {
  if (isNaN(Number(control.value))) {
    return { isNumeric: true };
  } else return null;
};

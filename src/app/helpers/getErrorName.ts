import { ValidationErrors } from '@angular/forms';
import { CustomErrorMap } from '../shared/form-components/form-element/types';

export const getErrorName = (
  errors: ValidationErrors | null | undefined,
  customErrorMap?: CustomErrorMap,
): string | null => {
  if (errors) {
    if (customErrorMap) {
      for (const customErrorKey in customErrorMap) {
        if (errors[customErrorKey]) return customErrorMap[customErrorKey];
      }
    }

    if (errors['required']) return 'Šis laukelis yra privalomas.';
    if (errors['notBeforeDate'])
      return 'Data negali būti ankstesnė nei nurodyta.';
    if (errors['min'])
      return `Įvestis negali būti mažesnė nei ${errors['min'].min}.`;
    if (errors['minControl'])
      return 'Įvestis negali būti mažesnė nei nurodyta.';
    if (errors['isNumeric']) return 'Įvestis privalo būti skaičius.';
  }

  return null;
};

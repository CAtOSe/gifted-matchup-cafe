import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormElementComponent } from '../form-element/form-element.component';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent
  extends FormElementComponent
  implements ControlValueAccessor
{
  formControl: FormControl = new FormControl();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }
}

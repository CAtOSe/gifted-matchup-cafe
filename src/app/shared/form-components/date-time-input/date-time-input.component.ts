import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormElementComponent } from '../form-element/form-element.component';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrl: './date-time-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true,
    },
  ],
})
export class DateTimeInputComponent
  extends FormElementComponent
  implements ControlValueAccessor
{
  @Input() allowPastDates = false;
  formControl: FormControl = new FormControl();

  currentDate = new Date();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }
}

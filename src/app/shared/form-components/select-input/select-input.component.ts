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
import { SelectValue } from './types';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent
  extends FormElementComponent
  implements ControlValueAccessor
{
  @Input({ required: true }) options: SelectValue[] = [];

  formControl: FormControl = new FormControl();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }
}

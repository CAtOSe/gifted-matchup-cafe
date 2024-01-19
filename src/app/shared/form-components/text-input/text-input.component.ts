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
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent
  extends FormElementComponent
  implements ControlValueAccessor
{
  @Input() type: 'text' | 'password' = 'text';
  @Input() readonly = false;

  formControl: FormControl = new FormControl();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }
}

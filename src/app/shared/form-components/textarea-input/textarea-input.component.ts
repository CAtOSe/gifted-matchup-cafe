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
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputComponent),
      multi: true,
    },
  ],
})
export class TextareaInputComponent
  extends FormElementComponent
  implements ControlValueAccessor
{
  formControl: FormControl = new FormControl();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }
}

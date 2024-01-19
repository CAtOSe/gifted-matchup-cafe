import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { getErrorName } from '../../../helpers/getErrorName';
import { CustomErrorMap } from './types';

@Component({
  selector: 'app-form-element',
  template: '',
})
export abstract class FormElementComponent implements AfterViewInit {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input() appearance: 'outline' | 'fill' = 'outline';
  @Input() customErrorMap?: CustomErrorMap;

  public abstract formControl: FormControl;
  protected propagateChange: (_: any) => void;
  protected propagateTouched: (_: any) => void;

  protected constructor(
    private injector: Injector,
    protected cdRef: ChangeDetectorRef,
  ) {
    this.propagateChange = () => {};
    this.propagateTouched = () => {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeValue(value: string | null) {
    // this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (_: string | null) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.propagateTouched = fn;
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl) {
      this.formControl = ngControl.control as FormControl;
    }
    this.cdRef.detectChanges();
  }

  getFormattedError() {
    return getErrorName(this.formControl.errors, this.customErrorMap);
  }
}

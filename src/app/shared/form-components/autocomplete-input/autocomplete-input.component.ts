import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
  Input,
} from '@angular/core';
import { FormElementComponent } from '../form-element/form-element.component';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectValue } from '../select-input/types';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteInputComponent),
      multi: true,
    },
  ],
})
export class AutocompleteInputComponent
  extends FormElementComponent
  implements ControlValueAccessor, AfterViewInit
{
  private _options: SelectValue[] = [];
  @Input() set options(value: SelectValue[]) {
    this._options = value;
  }
  get options() {
    return this._options;
  }

  filteredOptions!: Observable<SelectValue[]>;

  formControl: FormControl = new FormControl();

  constructor(injector: Injector, cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    this.filteredOptions = this.formControl.valueChanges.pipe(
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(value: SelectValue) {
    return value && value.display ? value.display : '';
  }

  private _filter(name: string): SelectValue[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.display.toLowerCase().includes(filterValue),
    );
  }
}

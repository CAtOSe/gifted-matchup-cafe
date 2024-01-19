import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Student } from '../../services/student/types';
import { StudentService } from '../../services/student/student.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogType } from '../../services/dialog/types';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  @ViewChild('studentFileInput') studentFileInput?: ElementRef;
  private unsubscribe$: Subject<void> = new Subject<void>();
  students?: Student[];
  loading = false;
  uploadForm?: FormGroup;

  constructor(
    private readonly studentService: StudentService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogService: DialogService,
  ) {}

  async upload() {
    const file = this.uploadForm?.value.studentFile;
    if (this.uploadForm?.valid && file) {
      this.loading = true;
      try {
        this.students = await this.studentService.uploadStudents(file);
        if (this.studentFileInput) {
          this.studentFileInput.nativeElement.value = '';
        }
        this.uploadForm.reset();
      } catch (err: any) {
        this.dialogService.open({
          title: 'Klaida',
          type: DialogType.Information,
          message: err.message,
        });
      } finally {
        this.loading = false;
      }
    }
  }

  private initForm() {
    this.uploadForm = this.formBuilder.group({
      studentFile: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loading = true;
    this.studentService
      .getAllStudents()
      .pipe(
        tap((x) => {
          this.students = x;
          this.loading = false;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readonly columnsToDisplay = ['fullName'];

  selectFile($event: Event) {
    const file = ($event.target as HTMLInputElement)?.files?.[0];
    this.uploadForm?.patchValue({ studentFile: file ?? null });
  }
}

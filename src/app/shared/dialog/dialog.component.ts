import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DialogActionType,
  DialogData,
  DialogType,
} from '../../services/dialog/types';
import { DialogService } from '../../services/dialog/dialog.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  protected readonly DialogType = DialogType;
  private destroy$: Subject<void> = new Subject<void>();

  showDialog = false;
  dialogData?: DialogData;
  selectedUserRole?: string;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.isOpen$
      .pipe(
        tap((x) => {
          this.showDialog = x;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.dialogService.dialogData$
      .pipe(
        tap((x) => {
          this.dialogData = x;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  dismiss() {
    this.dialogService.sendAction(DialogActionType.Dismiss);
  }

  confirm() {
    this.dialogService.sendAction(
      DialogActionType.Confirm,
      this.selectedUserRole,
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

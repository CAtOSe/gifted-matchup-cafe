import { Injectable } from '@angular/core';
import { DialogActionType, DialogData } from './types';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public isOpen$ = new Subject<boolean>();
  public dialogActions$ = new Subject<{
    action: DialogActionType;
    userRole?: string;
  }>();
  public dialogData$ = new Subject<DialogData>();

  open(dialogData: DialogData) {
    this.dialogData$.next(dialogData);
    this.isOpen$.next(true);
    return firstValueFrom(this.dialogActions$);
  }

  sendAction(action: DialogActionType, userRole?: string) {
    this.dialogActions$.next({ action, userRole });
    this.isOpen$.next(false);
  }
}

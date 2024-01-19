import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogType } from '../dialog/types';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly dialogService: DialogService) {}

  public handleApiError(error: HttpErrorResponse) {
    let userMessage = '';
    console.log(error);
    if (error.status === 401) {
      userMessage = this.showError('Jūs esatę neprisijungęs.');
    } else {
      userMessage = this.showError(
        'Nežinoma klaida. Prašome pabandyti vėliau.',
      );
    }
    return throwError(() => new Error(userMessage, { cause: error }));
  }

  private showError(errorMessage: string, errorTitle = 'Klaida') {
    this.dialogService.open({
      type: DialogType.Information,
      title: errorTitle,
      message: errorMessage,
    });
    return `${errorTitle}: ${errorMessage}`;
  }
}

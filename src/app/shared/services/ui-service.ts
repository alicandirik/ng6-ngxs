import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MessageModel} from '../models/message.model';
import {ConfirmationPopupModel} from '../models/confirmation-popup.model';
import {Observable} from 'rxjs';
import {ConfirmationPopupComponent} from '../popups/confirmation-popup/confirmation-popup.component';

@Injectable()
export class UiService {

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  openSnackBar(message: MessageModel, action: string = null, config: any = { duration: 3000 }) {
    config.panelClass = [`snackbar--${message.type}`];
    if (message.type === 'error') {
      config.duration = 30000;
    }
    console.log('Snackbar config: ', config);
    this.snackBar.open(message.text, action, config);
  }

  openUrl(downloadUrl: string) {
    window.open(downloadUrl, '_blank');
  }

  openConfirmationDialog(payload: ConfirmationPopupModel): Observable<ConfirmationPopupModel> {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        title: payload.title
      }
    });
    return dialogRef.afterClosed().map(reply => {
      const response = Object.assign({}, payload);
      response.reply = reply;
      return response;
    });
  }
}

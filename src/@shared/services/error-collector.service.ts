import { ErrorHandler, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ErrorCollectorService implements ErrorHandler {
  errors: Array<{ time: string, error: any }> = [];
  handleError(error: any) {
    this.errors.push({ time: new Date().toLocaleString(), error });
    console.error(error);
  }

  pushError(error: any) {
    this.errors.push({ time: new Date().toLocaleString(), error });
  }

  downloadLog() {
    const blob = new Blob([this.errors.map(e => `${e.time} - ${JSON.stringify(e.error)}`).join('\r\n\r\n')],
      { type: 'text/plain;charset=utf-8' });
    return saveAs(blob, 'errorlog.txt');
  }
}

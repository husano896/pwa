import { Injectable } from '@angular/core';

export const LocalStorageKey = {
  openTimes: 'open_times'
}

@Injectable({
  providedIn: 'root'
})

export class WebService {
  /** App已開啟的次數 */
  openedTimes?: number;

  constructor() {
    // 每次App開啟時就把次數+1
    this.openedTimes = Number(localStorage.getItem(LocalStorageKey.openTimes));
    this.openedTimes += 1;
    localStorage.setItem(LocalStorageKey.openTimes, `${this.openedTimes}`);
  }

}

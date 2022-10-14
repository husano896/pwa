import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';

@Injectable({
  providedIn: 'root'
})

/** 全站使用服務 */
export class WebService {
  /** App已開啟的次數 */
  openedTimes?: number;

  constructor() {
    this.setFirstTime();
    this.setOpenTimes();
    this.setThemeFromLocalStorage();
  }

  /**
   * 初次使用設定
   */
  setFirstTime() {
    const enounter = localStorage.getItem(LocalStorageKey.encounterDate);
    if (!enounter) {
      localStorage.setItem(LocalStorageKey.encounterDate, new Date().toISOString());
    }
  }

  getEncounterDate() {
    return new Date(localStorage.getItem(LocalStorageKey.encounterDate) || '');
  }

  /**
   * 每次App開啟時就把次數+1
   */
  setOpenTimes() {
    this.openedTimes = Number(localStorage.getItem(LocalStorageKey.openTimes));
    this.openedTimes += 1;
    localStorage.setItem(LocalStorageKey.openTimes, `${this.openedTimes}`);
  }

  // 主題區
  /** 自body取得目前使用中的主題 */
  getCurrentTheme() {
    return document.body.getAttribute('theme')
  }

  /** 設定主題 */
  setTheme(theme: string) {
    document.body.setAttribute('theme', theme);
    localStorage.setItem(LocalStorageKey.theme, theme);
  }

  /** 從LocalStorage讀取先前設定的主題 */
  setThemeFromLocalStorage() {
    const theme = localStorage.getItem(LocalStorageKey.theme);
    if (theme) {
      this.setTheme(theme);
    }
  }
}

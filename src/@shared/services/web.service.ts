import { Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';

@Injectable({
  providedIn: 'root'
})

/** 全站使用服務 */
export class WebService {
  /** App已開啟的次數 */
  openedTimes?: number;

  /** 隱藏上方工具列 */
  hideToolbar?: boolean;

  /** 右上角可額外操作的按鈕 */
  selectedPortal?: Portal<any>;

  constructor() {
    this.setFirstEncounter();
    this.setOpenTimes();
    this.setThemeFromLocalStorage();
  }

  /**
   * 初次使用設定
   */
  setFirstEncounter() {
    const enounter = localStorage.getItem(LocalStorageKey.encounterDate);
    if (!enounter) {
      localStorage.setItem(LocalStorageKey.encounterDate, new Date().toISOString());
    }
  }

  get encounterDate() {
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
  get theme() {
    return localStorage.getItem(LocalStorageKey.theme)
  }

  /** 設定主題 */
  set theme(theme: string | null) {
    document.body.setAttribute('theme', theme || (window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'));
    localStorage.setItem(LocalStorageKey.theme, theme || '');
  }

  /** 偵錯選項 */
  get debug() {
    return Boolean(localStorage.getItem(LocalStorageKey.debugMode))
  }

  set debug(open: boolean) {
    localStorage.setItem(LocalStorageKey.debugMode, open ? 'true' : '')
  }

  /** 自body取得目前使用中的主題 */
  get disableAnimation() {
    return JSON.parse(localStorage.getItem(LocalStorageKey.disableAnimation) || 'null');
  }

  /** 設定主題 */
  set disableAnimation(disable: boolean | null) {
    console.log(disable);
    if (disable === null) {
      localStorage.removeItem(LocalStorageKey.disableAnimation)
    } else {
      localStorage.setItem(LocalStorageKey.disableAnimation, JSON.stringify(disable));
    }
  }

  /** 從LocalStorage讀取先前設定的主題 */
  setThemeFromLocalStorage() {
    const theme = localStorage.getItem(LocalStorageKey.theme);
    this.theme = theme || '';

  }
}

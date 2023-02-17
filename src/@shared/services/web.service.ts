import { Portal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { BehaviorSubject, Subject } from 'rxjs';

export const BUILT_DATE = new Date().toISOString();

@Injectable({
  providedIn: 'root'
})

/** 全站使用服務 */
export class WebService {
  /** App已開啟的次數 */
  openedTimes?: number;

  /** 隱藏上方工具列 */
  hideToolbar?: boolean;

  /** 目前未使用：右上角可額外操作的按鈕 */
  selectedPortal?: Portal<any>;

  /** 網站離線/上線事件 */
  online$: Subject<boolean> = new Subject<boolean>();

  /** 網路是否正常 */
  online: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._setFirstEncounter();
    this._setOpenTimes();
    this.setThemeFromLocalStorage();
    this._registerOnlineOfflineEvent();

  }

  /** 返回上層目錄 */
  back() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  /**
   * 初次使用設定
   */
  private _setFirstEncounter() {
    const enounter = localStorage.getItem(LocalStorageKey.encounterDate)
    const oldEncounter = localStorage.getItem(LocalStorageKey.old_encounterDate);
    if (!enounter) {
      if (oldEncounter) {
        console.log('將舊的日期移轉至新日期.')
        localStorage.setItem(LocalStorageKey.encounterDate, oldEncounter);
      } else {
        localStorage.setItem(LocalStorageKey.encounterDate, new Date().toISOString());
      }
    }
  }


  get encounterDate() {
    return new Date(localStorage.getItem(LocalStorageKey.encounterDate) || localStorage.getItem(LocalStorageKey.old_encounterDate) || '');
  }

  /**
   * 每次App開啟時就把次數+1
   */
  private _setOpenTimes() {
    this.openedTimes = Number(localStorage.getItem(LocalStorageKey.openTimes) || localStorage.getItem(LocalStorageKey.old_openTimes));
    this.openedTimes += 1;
    localStorage.setItem(LocalStorageKey.openTimes, `${this.openedTimes}`);
  }

  // 主題區
  /** 自body取得目前使用中的主題 */
  get theme() {
    return localStorage.getItem(LocalStorageKey.theme) || localStorage.getItem(LocalStorageKey.old_theme)
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
    return JSON.parse(localStorage.getItem(LocalStorageKey.disableAnimation) ||
      localStorage.getItem(LocalStorageKey.old_disableAnimation) || 'null');
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

  /** 自動同步 */
  get autoSync() {
    return Boolean(localStorage.getItem(LocalStorageKey.autoSync))
  }

  set autoSync(open: boolean) {
    localStorage.setItem(LocalStorageKey.autoSync, open ? 'true' : '')
  }

  /** 聆聽網路離線/上線事件 */
  private _registerOnlineOfflineEvent() {
    window.addEventListener('online', this._handleOnlineEvent.bind(this));
    window.addEventListener('offline', this._handleOfflineEvent.bind(this));
  }

  private _unregisterOnlineOfflineEvent() {
    window.removeEventListener('online', this._handleOnlineEvent.bind(this));
    window.removeEventListener('offline', this._handleOfflineEvent.bind(this));

  }

  private _handleOnlineEvent() {
    if (this.online) {
      return;
    }
    this.online$.next(true);
    this.online = true;
  }

  private _handleOfflineEvent() {
    if (!this.online) {
      return;
    }
    this.online$.next(false);
    this.online = false;
  }

  onDestroy() {
    this._unregisterOnlineOfflineEvent();
  }
}

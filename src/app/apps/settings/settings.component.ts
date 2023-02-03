import { FirebaseService } from '@shared/services/firebase.service';
import { ErrorCollectorService } from '@shared/services/error-collector.service';
import { WebService } from '@shared/services/web.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {

  static IconName = 'settings';
  static AppName = '設定'

  @ViewChild('themeDialog') themeDialog!: TemplateRef<any>;
  @ViewChild('animDialog') animDialog!: TemplateRef<any>;

  constructor(
    private webServ: WebService,
    private bottomSheet: MatBottomSheet,
    private errorServ: ErrorCollectorService,
    private firebaseServ: FirebaseService) { }

  /** 登入項 */
  login() {
    if (!this.user) {
      this.firebaseServ.LoginWithGoogle();
    }
  }

  logout() {
    if (this.user) {
      this.firebaseServ.Logout();
    }
  }
  // 開啟主題設定視窗
  openThemeBottomSheet() {
    this.bottomSheet.open(this.themeDialog);
  }

  // 開啟動畫設定視窗
  openAnimBottomSheet() {
    this.bottomSheet.open(this.animDialog);
  }

  // 設定主題
  selectTheme(theme: string) {
    this.webServ.theme = theme;
    this.bottomSheet.dismiss();
  }

  // 設定動畫開啟關閉
  selectAnim(disable: boolean | null) {
    this.webServ.disableAnimation = disable;
    this.bottomSheet.dismiss();
    location.reload();
  }

  getFirstEncounterDate() {
    return this.webServ.encounterDate.toLocaleString()
  }

  getCurrentThemeDisplayName() {
    const theme = this.webServ.theme;
    if (!theme) {
      return '系統';
    }
    return theme === 'light' ? '明亮' : '暗黑';
  }

  getCurrentAnimDisplayName() {
    const disable = this.webServ.disableAnimation
    if (disable === null) {
      return '系統';
    }
    return disable ? '停用' : "啟用";
  }

  // 進階
  /** 下載偵錯Log */
  get debugLogSize() {
    return this.errorServ.errors.length;
  }

  downloadDebuglog() {
    this.errorServ.downloadLog();
  }

  /** 清除快取與ServiceWorker */
  async resetServiceWorker() {
    if (confirm('確定要清除快取? 頁面將重新載入, 且未連網時App將無法作用.')) {
      self.caches.keys().then(keys => { keys.forEach(key => self.caches.delete(key)) })

      const registrations = await navigator.serviceWorker.getRegistrations()

      registrations.forEach(registration => {
        registration.unregister()
      })

      window.location.href = './';
    }
  }
  /** 重設所有設定 */
  resetAllSettings() {
    if (confirm('確定重設所有資料? 頁面將重新載入.')) {
      localStorage.clear();
      window.location.href = './';
    }
  }

  get debugMode() {
    return this.webServ.debug;
  }

  set debugMode(v) {
    this.webServ.debug = v;
  }

  /** Firebase登入的使用者 */
  get user() {
    return this.firebaseServ.User;
  }

  /** 自動同步 */
  get autoSync() {
    return this.webServ.autoSync;
  }

  set autoSync(v) {
    this.webServ.autoSync = v;
  }
}

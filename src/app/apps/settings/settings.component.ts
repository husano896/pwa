import { ErrorCollectorService } from './../../../@shared/services/error-collector.service';
import { WebService } from '@shared/services/web.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  static IconName = 'settings';
  static AppName = '設定'

  @ViewChild('themeDialog') themeDialog!: TemplateRef<any>;

  constructor(
    private webServ: WebService,
    private bottomSheet: MatBottomSheet,
    private errorServ: ErrorCollectorService) { }

  ngOnInit(): void { }

  // 開啟主題設定視窗
  openThemeBottomSheet() {
    this.bottomSheet.open(this.themeDialog);
  }

  // 設定主題
  selectTheme(theme: string) {
    this.webServ.theme = theme;
    this.bottomSheet.dismiss();
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

  // 進階
  /** 下載偵錯Log */

  get debugLogSize() {
    return this.errorServ.errors.length;
  }

  downloadDebuglog() {
    this.errorServ.downloadLog();
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
}

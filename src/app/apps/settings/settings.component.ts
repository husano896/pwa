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

  constructor(private webServ: WebService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void { }

  // 主題設定
  openThemeBottomSheet() {
    this.bottomSheet.open(this.themeDialog);
  }

  selectTheme(theme: string) {
    this.webServ.setTheme(theme);
    this.bottomSheet.dismiss();
  }

  getFirstEncounterDate() {
    return this.webServ.getEncounterDate().toLocaleString()
  }
  getCurrentThemeDisplayName() {
    const theme = this.webServ.getCurrentTheme();
    if (!theme) {
      return '系統';
    }
    return theme === 'light' ? '明亮' : '暗黑';
  }

  // 進階
  resetAllSettings() {
    if (confirm('確定重設所有資料? 頁面將重新載入.')) {
      localStorage.clear();
      window.location.href = './';
    }
  }
}

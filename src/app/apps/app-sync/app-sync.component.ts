import { Component, OnInit } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';

@Component({
  selector: 'app-app-sync',
  templateUrl: './app-sync.component.html',
  styleUrls: ['./app-sync.component.scss']
})

/** 
 * 作為和我的其他作品連動用的顯示資料...
 * 具體要拿連動的資料做什麼還未決定
 */
export class AppSyncComponent implements OnInit {
  static IconName = 'sync';
  static AppName = 'App連動'

  constructor() { }

  ngOnInit(): void {
  }

  getBreakoutSave() {
    return localStorage.getItem(LocalStorageKey.Breakout_Save)
  }
}

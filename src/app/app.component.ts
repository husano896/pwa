import { FirebaseService } from '@shared/services/firebase.service';
import { SubscriptionManageComponent } from './apps/subscription-manage/subscription-manage.component';
import { AsiaMinorComponent } from './apps/asiaminor/asiaminor.component';
import { NotepadComponent } from './apps/notepad/notepad.component';
import { QrcodeComponent } from './apps/qrcode/qrcode.component';
import { EviatComponent } from './apps/eviat/eviat.component';
import { AboutComponent } from './apps/about/about.component';
import { TodoComponent } from './apps/todo/todo.component';
import { IndexComponent } from './apps/index/index.component';
import { TodoService } from '@shared/services/todo.service';
import { BUILT_DATE, WebService } from '@shared/services/web.service';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SettingsComponent } from './apps/settings/settings.component';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { AppSyncComponent } from './apps/app-sync/app-sync.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatDrawer) drawer?: MatDrawer;

  links = [
    { name: IndexComponent.AppName, path: '', icon: IndexComponent.IconName },
    { name: TodoComponent.AppName, path: 'todo', icon: TodoComponent.IconName, extra: () => this.todoServ.todo.length },
    { name: EviatComponent.AppName, path: 'eviat', icon: EviatComponent.IconName },
    { name: AsiaMinorComponent.AppName, path: 'asiaminor', icon: AsiaMinorComponent.IconName },
    { name: QrcodeComponent.AppName, path: 'qrcode', icon: QrcodeComponent.IconName },
    { name: NotepadComponent.AppName, path: 'notepad', icon: NotepadComponent.IconName },
    { name: SubscriptionManageComponent.AppName, path: 'subscription_manage', icon: SubscriptionManageComponent.IconName, sync: true },
    // { name: SurveyComponent.AppName, path: 'survey', icon: SurveyComponent.IconName },
    { name: AppSyncComponent.AppName, path: 'app_sync', icon: AppSyncComponent.IconName },
    { name: SettingsComponent.AppName, path: 'settings', icon: SettingsComponent.IconName },
    { name: AboutComponent.AppName, path: 'about', icon: AboutComponent.IconName },

  ]

  sidebarClosed: boolean = false;
  CurrentFunctionName?: string = 'xFly PWA';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoServ: TodoService,
    private webServ: WebService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private translate: TranslateService,
    private firebaseServ: FirebaseService,
    private snackbar: MatSnackBar
  ) {

    // 目前功能名稱取得
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer?.close();

        const fragments = router.url.split('/')
        const fragment = fragments[fragments.length - 1]
        this.CurrentFunctionName = this.links.find(l => l.path === fragment)?.name;
      }
    });
    // Service worker更新部分
    if (this.swPush.isEnabled) {
      console.log('[ServiceWorker] 已啟用.');
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.snackbar.open('新版本已安裝完成！重新整理以載入', '重新整理', {panelClass: 'mat-positive-bg'}).onAction().subscribe(() => {
            location.reload();
          })
        }
      })
    }
    this.translate.use('zh-tw');
    this.translate.setDefaultLang('zh-tw');
    // Query參數訂閱
    this.route.queryParams.subscribe((params: any) => {
      if (!params) {
        return;
      }
      // 語言參數
      if (params.l && this.translate.currentLang !== params.l) {
        console.log('use lang ', params.l);
        this.translate.use(params.l);
      }
    });
  }

  /**
   * 隱藏網站自身導覽列, 各App內需自備工具列！
  */
  get hideToolbar() {
    return this.webServ.hideToolbar;
  }

  /*
  // 原本要做為右上角的額外行動列使用, 但標題列也該可下放, 因此交給各App實作Toolbar.
  get selectedPortal() {
    return this.webServ.selectedPortal;
  }
  */

  /** 自動同步 */
  get autoSync() {
    return this.webServ.autoSync
  }

  get user() {
    return this.firebaseServ.User;
  }

  get BUILT_DATE() {
    return BUILT_DATE;
  }
}

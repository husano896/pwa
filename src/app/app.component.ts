import { SurveyComponent } from './apps/survey/survey.component';
import { AsiaMinorComponent } from './apps/asiaminor/asiaminor.component';
import { NotepadComponent } from './apps/notepad/notepad.component';
import { QrcodeComponent } from './apps/qrcode/qrcode.component';
import { EviatComponent } from './apps/eviat/eviat.component';
import { AboutComponent } from './apps/about/about.component';
import { TodoComponent } from './apps/todo/todo.component';
import { IndexComponent } from './apps/index/index.component';
import { TodoService } from '../@shared/services/todo.service';
import { WebService } from '../@shared/services/web.service';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SettingsComponent } from './apps/settings/settings.component';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';

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
    { name: SurveyComponent.AppName, path: 'survey', icon: SurveyComponent.IconName },
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
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {

    // ????????????????????????
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer?.close();
        // console.log(this.router, this.CurrentFunctionName);

        const fragments = router.url.split('/')
        const fragment = fragments[fragments.length - 1]
        this.CurrentFunctionName = this.links.find(l => l.path === fragment)?.name;
      }
    });
    // Service worker????????????
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.snackbar.open('????????????????????????????????????????????????', '????????????').onAction().subscribe(() => {
          location.reload();
        })
      }
    })

    this.translate.use('zh-tw');
    this.translate.setDefaultLang('zh-tw');
    // Query????????????
    this.route.queryParams.subscribe((params: any) => {
      if (!params) {
        return;
      }
      // ????????????
      if (params.l && this.translate.currentLang !== params.l) {
        console.log('use lang ', params.l);
        this.translate.use(params.l);
      }
    });
  }

  /**
   * ???????????????????????????, ???App????????????????????????
  */
  get hideToolbar() {
    return this.webServ.hideToolbar;
  }

  /*
  // ????????????????????????????????????????????????, ???????????????????????????, ???????????????App??????Toolbar.
  get selectedPortal() {
    return this.webServ.selectedPortal;
  }
  */
}

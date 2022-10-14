import { EviatComponent } from './apps/eviat/eviat.component';
import { AboutComponent } from './apps/about/about.component';
import { TodoComponent } from './apps/todo/todo.component';
import { IndexComponent } from './apps/index/index.component';
import { TodoService } from '../@shared/services/todo.service';
import { WebService } from '../@shared/services/web.service';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SettingsComponent } from './apps/settings/settings.component';


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
    { name: SettingsComponent.AppName, path: 'settings', icon: SettingsComponent.IconName },
    { name: AboutComponent.AppName, path: 'about', icon: AboutComponent.IconName }
  ]

  sidebarClosed: boolean = false;
  CurrentFunctionName?: string = 'xFly PWA';

  constructor(private router: Router, private route: ActivatedRoute, private todoServ: TodoService) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer?.close();
        console.log(this.router, this.CurrentFunctionName);

        const fragments = router.url.split('/')
        const fragment = fragments[fragments.length - 1]
        this.CurrentFunctionName = this.links.find(l => l.path === fragment)?.name;
      }
    });
  }
}

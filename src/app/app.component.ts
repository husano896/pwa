import { TodoService } from './services/todo.service';
import { WebService } from './services/web.service';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { link } from 'fs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatDrawer) drawer?: MatDrawer;

  links = [
    { name: '首頁', path: '' },
    { name: '代辦事項', path: 'todo', extra: ()=> this.todoServ.todo.length }
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
  goBack(): void {
    window.history.back();
  }

}

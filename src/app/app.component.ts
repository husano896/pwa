import { WebService } from './web.service';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatDrawer) drawer?: MatDrawer;
  title = 'xfly-pwa';

  links = [
    { name: '首頁', path: '' }
  ]
  sidebarClosed: boolean = false;

  constructor(private router: Router) {

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.drawer?.close();
    });
  }
  goBack(): void {
    window.history.back();
  }

}

import { EviatComponent } from './apps/eviat/eviat.component';
import { SettingsComponent } from './apps/settings/settings.component';
import { TodoComponent } from './apps/todo/todo.component';
import { IndexComponent } from './apps/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './apps/about/about.component';
import { NotepadComponent } from './apps/notepad/notepad.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'eviat',
    component: EviatComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'notepad',
    component: NotepadComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

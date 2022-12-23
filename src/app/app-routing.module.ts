import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './apps/settings/settings.component';
import { IndexComponent } from './apps/index/index.component';

const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./apps/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'eviat',
    loadChildren: () => import('./apps/eviat/eviat.module').then(m => m.EviatModule)
  },
  {
    path: 'asiaminor',
    loadChildren: () => import('./apps/asiaminor/asiaminor.module').then(m => m.AsiaMinorModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./apps/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'notepad',
    loadChildren: () => import('./apps/notepad/notepad.module').then(m => m.NotepadModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./apps/qrcode/qrcode.module').then(m => m.QrcodeModule)
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

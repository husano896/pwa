import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './apps/settings/settings.component';
import { IndexComponent } from './apps/index/index.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'todo',
    loadChildren: () => import('./apps/todo/todo.module').then(m => m.TodoModule)
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
    path: 'subscription_manage',
    loadChildren: () => import('./apps/subscription-manage/subscription-manage.module').then(m => m.SubscriptionManageModule)
  },
  {
    path: 'app_sync',
    loadChildren: () => import('./apps/app-sync/app-sync.module').then(m => m.AppSyncModule)
  },
  /** TODO: 這個跟風太熱門了，應該分流到其他網站去...XD (用轉跳的) */
  {
    path: 'survey',
    loadChildren: () => import('./apps/survey/survey.module').then(m => m.SurveyModule)
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

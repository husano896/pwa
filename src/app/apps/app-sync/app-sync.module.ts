import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppSyncComponent } from './app-sync.component';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [{
  path: '',
  component: AppSyncComponent
}];

@NgModule({
  declarations: [AppSyncComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    RouterModule.forChild(routes)
  ]
})
export class AppSyncModule { }

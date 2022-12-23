import { FlexLayoutModule } from '@angular/flex-layout';
import { EviatComponent } from './eviat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: EviatComponent
}];

@NgModule({
  declarations: [EviatComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class EviatModule { }

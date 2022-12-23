import { FlexLayoutModule } from '@angular/flex-layout';
import { AsiaMinorComponent } from './asiaminor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: AsiaMinorComponent
}];

@NgModule({
  declarations: [AsiaMinorComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AsiaMinorModule { }

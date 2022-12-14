import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: AboutComponent
}];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }

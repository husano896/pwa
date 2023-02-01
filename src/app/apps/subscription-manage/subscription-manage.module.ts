import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManageComponent } from './subscription-manage.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionManageService } from './subscription-manage.service';

const routes: Routes = [{
  path: '',
  component: SubscriptionManageComponent
}];


@NgModule({
  declarations: [SubscriptionManageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    SubscriptionManageService
  ]
})
export class SubscriptionManageModule { }

import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManageComponent } from './subscription-manage.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionManageService } from './subscription-manage.service';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CurrenciesComponent } from './currencies/currencies.component';
const routes: Routes = [
  {
    path: 'currencies',
    component: CurrenciesComponent
  },
  {
    path: '',
    component: SubscriptionManageComponent
  }
];


@NgModule({
  declarations: [SubscriptionManageComponent, CurrenciesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule

  ],
  providers: [
    SubscriptionManageService
  ]
})
export class SubscriptionManageModule { }

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseModule } from '@shared/firebase.module';
import { FurdrinksbarComponent } from './furdrinksbar.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [{
  path: '',
  component: FurdrinksbarComponent
}];

@NgModule({
  declarations: [FurdrinksbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatMenuModule,
    MatCardModule, 
    MatIconModule,
    FirebaseModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class FurDrinksBarModule { }

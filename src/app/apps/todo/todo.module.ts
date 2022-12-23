import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoComponent } from './todo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [{
  path: '',
  component: TodoComponent
}];

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoModule { }

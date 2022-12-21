import { TodoService } from '@shared/services/todo.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoDto } from '@shared/entities/TodoDto';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  static IconName = 'checklist';
  static AppName = '代辦事項'

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    dueDate: new FormControl()
  })
  constructor(private todoServ: TodoService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<TodoDto[]>) {
    // 在同一個列表移動時
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // 在不同列表移動時
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.todoServ.Save();
  }

  openCreateDialog() {
    this.formGroup.reset();
    this.dialog.open(this.editDialog);
  }

  Submit() {
    this.todoServ.AddTodo(this.formGroup.value);
    this.dialog.closeAll();
  }

  Delete(item: TodoDto) {
    this.todoServ.Delete(item);
  }


  get todo() {
    return this.todoServ.todo;
  }

  getTodoStyle(item: TodoDto) {

    if (item.IsOverDue()) {
      // 過期時給予紅色背景
      return {
        'background-color': 'rgba(237,28,36,0.5)'
      }
    }
    return {

    }
  }

  /** 如果開始日期晚於結束日期, 互換 */
  swapDateIfLater() {
    if (this.formGroup.value.date && this.formGroup.value.dueDate
      && this.formGroup.value.date > this.formGroup.value.dueDate) {
      this.formGroup.patchValue({
        date: this.formGroup.value.dueDate,
        dueDate: this.formGroup.value.date
      })
    }
  }
}

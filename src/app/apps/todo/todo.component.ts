import { MatSnackBar } from '@angular/material/snack-bar';
import { WebService } from '@shared/services/web.service';
import { TodoService } from '@shared/services/todo.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoDto } from '@shared/entities/TodoDto';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  static IconName = 'checklist';
  static AppName = '代辦事項'

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    dueDate: new FormControl(),
    completed: new FormControl(false)
  })
  constructor(
    private todoServ: TodoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private webServ: WebService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.webServ.hideToolbar = true;
    })
  }
  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
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

  back() {
    this.router.navigate(['..']);
  }

  openCreateDialog() {
    this.formGroup.reset();
    this.dialog.open(this.editDialog);
  }

  Submit() {
    this.todoServ.AddTodo(this.formGroup.value);
    this.dialog.closeAll();
  }

  MarkAsComplete(i: TodoDto) {
    this.todoServ.MarkAsComplete(i);
    this.snackBar.open(`已標記為${i.completed ? '完成' : '未完成'}：${i.name}.`, '', { duration: 3000 });
  }

  Delete(i: TodoDto) {
    this.snackBar.open(`已刪除：${i.name}.`, '', { duration: 3000 });
    this.todoServ.Delete(i);
  }

  get todo() {
    return this.todoServ.todo;
  }

  get InComing() {
    return this.todoServ.InComing;
  }
  get InProgress() {
    return this.todoServ.InProgress;
  }
  get OverDue() {
    return this.todoServ.Overdue;
  }
  get Completed() {
    return this.todoServ.Completed;
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

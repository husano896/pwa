import { DayjsConverter } from '@shared/DayjsConverter';
import dayjs from 'dayjs-es';
import { JsonConvert } from 'json2typescript';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebService } from '@shared/services/web.service';
import { TodoService } from '@shared/services/todo.service'
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoDto } from '@shared/entities/TodoDto';
import { ActivatedRoute, Router } from '@angular/router'
import _ from 'lodash-es';

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
    date: new FormControl(null, [Validators.required]),
    dueDate: new FormControl(),
    completed: new FormControl(false),
    id: new FormControl(null)
  })

  private converter = new JsonConvert()

  constructor(
    private todoServ: TodoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private webServ: WebService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.webServ.hideToolbar = true;
    })
  }

  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
  }

  back() {
    this.webServ.back();
  }

  openCreateDialog(item?: TodoDto) {
    // 因為Date沒辦法餵dayjs物件進去, 目前都直接先轉成string
    if (!item) {
      this.formGroup.reset();
      this.formGroup.patchValue({ date: new DayjsConverter().serialize(dayjs()) })
    } else {
      this.formGroup.patchValue(this.converter.serializeObject(item, TodoDto))
    }
    this.dialog.open(this.editDialog);
  }

  Submit() {
    this.swapDateIfLater();
    this.todoServ.AddOrEditTodo(this.formGroup.value);
    this.dialog.closeAll();
    this.snackBar.open(
      `已${!this.formGroup.value.id ? '新增' : '編輯'}：${this.formGroup.value.name}.`,
      'OK',
      { duration: 3000, panelClass: 'mat-positive-bg' }
    );
  }

  MarkAsComplete(i: TodoDto) {
    this.todoServ.MarkAsComplete(i);
    this.snackBar.open(`已標記為${i.completed ? '完成' : '未完成'}：${i.name}.`, 'OK', { duration: 3000, panelClass: 'mat-positive-bg' });
  }

  Delete(i: TodoDto) {
    this.todoServ.Delete(i);
    this.snackBar.open(`已刪除：${i.name}.`, 'OK', { duration: 3000, panelClass: 'mat-positive-bg' });
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

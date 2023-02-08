import { JsonConvert } from 'json2typescript';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { TodoDto } from '@shared/entities/TodoDto';
import _ from 'lodash-es';

export interface ITodoDto {
  name: string;
  date: string;
  dueDate: string;
  completed: boolean;
  id: string;
}

@Injectable({
  providedIn: 'root'
})

/** 代辦事項服務 */
export class TodoService {

  public todo: TodoDto[] = [];

  private converter = new JsonConvert()
  constructor() {
    const todoString = localStorage.getItem(LocalStorageKey.todo) || localStorage.getItem(LocalStorageKey.old_todo);
    // 讀取本地已有的TODO
    if (todoString) {
      this.todo = this.converter.deserializeArray((JSON.parse(todoString) as any[]), TodoDto)
      console.log(this.todo)
    }
  }

  AddOrEditTodo(value: any) {

    // 複製一份, 不要對外部傳進來的直接改...
    const v = _.clone(value);
    // 如果有已存在項目時, 修改原先項目
    const existedItem = this.todo.find(t => t.id && t.id === v.id);
    if (existedItem) {
      Object.assign(existedItem, this.converter.deserializeObject(v, TodoDto));
    } else {
      // 新增項目的場合
      if (!v.id) {
        v.id = crypto.randomUUID()
      }
      this.todo.push(this.converter.deserializeObject(v, TodoDto))
    }
    this.Save();
  }

  MarkAsComplete(i: TodoDto) {
    i.completed = !i.completed;
    this.Save();
  }

  Delete(i: TodoDto) {
    this.todo = this.todo.filter(todo => todo !== i);
    this.Save();
  }
  Save() {
    this.todo.sort((a, b) => a.date > b.date ? 1 : -1);
    localStorage.setItem(LocalStorageKey.todo, JSON.stringify(this.converter.serializeArray(this.todo, TodoDto)));
  }

  ClearAllOverDue() {
    this.todo = this.todo.filter(t => !t.IsOverDue());
    this.Save();
  }

  /** 各個分類的事件 */
  get InProgress() {
    return this.todo.filter(t => t.IsInProgress());
  }

  get InComing() {
    return this.todo.filter(t => t.IsInComing());
  }

  get Overdue() {
    return this.todo.filter(t => t.IsOverDue());
  }

  get Completed() {
    return this.todo.filter(t => t.IsCompleted());
  }

}

import { JsonConvert, JsonConverter } from 'json2typescript';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { TodoDto } from '@shared/entities/TodoDto';

export interface ITodoDto {
  name: string;
  date: string;
  dueDate: string;
  completed: boolean;
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
      this.todo = this.converter.deserialize((JSON.parse(todoString) as any[]), TodoDto) as TodoDto[];
    }
  }

  AddTodo(value: {}) {
    this.todo.push(this.converter.deserialize<TodoDto>(value, TodoDto) as TodoDto)
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
    localStorage.setItem(LocalStorageKey.todo, JSON.stringify(this.converter.serializeArray(this.todo, TodoDto)));
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

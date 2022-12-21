import { JsonConvert, JsonConverter } from 'json2typescript';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { TodoDto } from '@shared/entities/TodoDto';

export interface ITodoDto {
  name: string;
  date: string;
  dueDate: string;
}
@Injectable({
  providedIn: 'root'
})
/** 代辦事項服務 */
export class TodoService {

  public todo: TodoDto[] = [];

  private converter = new JsonConvert()
  constructor() {
    const todoString = localStorage.getItem(LocalStorageKey.todo);
    // 讀取本地已有的TODO
    if (todoString) {
      this.todo = this.converter.deserialize((JSON.parse(todoString) as any[]), TodoDto) as TodoDto[];
      console.log(this.todo)
    }
  }

  AddTodo(value: {}) {
    this.todo.push(this.converter.serialize(value, TodoDto))
    this.Save();
  }

  Delete(i: TodoDto) {
    this.todo = this.todo.filter(todo => todo !== i);
    this.Save();
  }
  Save() {
    localStorage.setItem(LocalStorageKey.todo, JSON.stringify(this.converter.serializeArray(this.todo, TodoDto)));
  }
}

import { JsonConvert } from 'json2typescript';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { TodoDto } from '@shared/entities/TodoDto';
import _ from 'lodash-es';
import { FirebaseService } from './firebase.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import dayjs from 'dayjs-es';
import { ITodoSave, TodoSaveDto } from '@shared/entities/TodoSaveDto';
import { WebService } from './web.service';

/** 預設使用的存檔 */
const DEFAULT_SAVE: TodoSaveDto = new TodoSaveDto()

const AppCollectionName = 'Todo'

const AppLocalStorageName = LocalStorageKey.todo;

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

  private _save?: TodoSaveDto;
  private converter = new JsonConvert();
  private _firebaseSubscription: Subscription;

  private _cache: {
    InProgress: TodoDto[],
    InComing: TodoDto[],
    Overdue: TodoDto[],
    Completed: TodoDto[]
  } = {
      InProgress: [],
      InComing: [],
      Overdue: [],
      Completed: []
    }

  private _chartCache = []
  constructor(
    private firebaseServ: FirebaseService,
    private matSnackbar: MatSnackBar) {
    this.loadFromLocalStorage();
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
    this.SaveToLocalStorage();
  }

  MarkAsComplete(i: TodoDto) {
    i.completed = !i.completed;
    this.SaveToLocalStorage();
  }

  Delete(i: TodoDto) {
    this.todo = this.todo.filter(todo => todo !== i);
    this.SaveToLocalStorage();
  }

  ClearAllOverDue() {
    this.todo = this.todo.filter(t => !t.IsOverDue());
    this.SaveToLocalStorage();
  }

  /** 訂閱中的項目 */
  public set todo(v) {
    this._save.items = v;
  }

  /** 訂閱中的項目 */
  public get todo() {
    return this._save.items;
  }

  public subscribeFromFirebase() {
    this.unsubscribe();
    this._firebaseSubscription = this.firebaseServ.createSyncDataPipe(AppCollectionName)
      .subscribe({
        next: (snapshot) => {
          // 無User導致snapshot = null時, 不動作
          if (!snapshot) {
            return;
          }
          const data = snapshot.payload.exists ? snapshot.payload.data() as ITodoSave : null;
          console.log(`[${AppCollectionName}] 線上資料`, data, '本地資料', this._save);
          if (!snapshot.payload.exists || data.time < this._save.time) {
            // 如果本地版本比線上版本新, 或線上版本不存在時, 備份至線上.
            this.SaveToFirebase();
          } else if (!this._save.time || data.time > this._save.time) {
            // 如果線上版本比本地版本新時, 覆蓋本地
            console.log(`[${AppCollectionName}] 自線上取得了存檔`, data)
            this.matSnackbar.open(
              `自雲端取得 ${dayjs(data.time).format('YYYY/MM/DD HH:mm:ss')} 存檔.`,
              '',
              { duration: 3000, panelClass: 'mat-positive-bg' }
            )
            this._save = this.converter.deserializeObject(data, TodoSaveDto);
            localStorage.setItem(AppLocalStorageName, JSON.stringify(this._save));
          }
        }, error: (err) => {
          this.matSnackbar.open(
            `取得雲端存檔時發生錯誤：${err}`,
            '',
            { duration: 3000, panelClass: 'mat-warning-bg' }
          )
        }
      })
  }

  public async SaveToFirebase() {
    const result = await this.firebaseServ.saveSyncData(AppCollectionName, this.converter.serializeObject(this._save, TodoSaveDto));
    if (result) {
      console.log(`[${AppCollectionName}] 儲存至Firebase完畢.`)
    }
  }

  /** 由元件層呼叫：取消聆聽 */
  public unsubscribe() {
    // 取消對Firebase的聆聽
    if (this._firebaseSubscription) {
      this._firebaseSubscription.unsubscribe();
      this._firebaseSubscription = null;
    }
  }

  /** 存檔至LocalStorage */
  public SaveToLocalStorage() {

    this.todo.sort((a, b) => a.date > b.date ? 1 : -1);
    this._save.lastSaveTime = this._save.time;
    this._save.time = new Date().getTime();

    try {
      localStorage.setItem(AppLocalStorageName, JSON.stringify(this._save));
    } catch (err) {
      console.warn(`[${AppCollectionName}] 存檔時發生錯誤！`, err);
    }
    this.recalculateCache();
    this.SaveToFirebase();
  }

  /** 自LocalStorage讀取存檔 */
  public loadFromLocalStorage() {

    try {
      const todoString = localStorage.getItem(AppLocalStorageName);
      // 讀取本地已有的TODO
      if (todoString) {
        const orgObject = JSON.parse(todoString)
        if (orgObject) {
          if (orgObject instanceof Array) {
            this._save = new TodoSaveDto();
            this.todo = this.converter.deserializeArray(orgObject, TodoDto)
          } else if (orgObject instanceof Object)
            this._save = this.converter.deserializeObject(orgObject, TodoSaveDto);
        }
      }
      console.log(this._save)
    } catch (err) {
      console.warn(`[${AppCollectionName}] 讀檔時發生錯誤！`, err);
    } finally {
      if (!this._save) {
        this._save = DEFAULT_SAVE;
      }
      this.recalculateCache();
    }
  }

  /** 各個分類的事件 */
  get InProgress() {
    return this._cache.InProgress
  }

  get InComing() {
    return this._cache.InComing;
  }

  get Overdue() {
    return this._cache.Overdue;
  }

  get Completed() {
    return this._cache.Completed;
  }

  get ChartData() {
    return this._chartCache;
  }

  /** 重新計算各分類以及圓餅圖的快取 */
  private recalculateCache() {
    this._cache = {
      InProgress: this.todo.filter(t => t.IsInProgress()),
      InComing: this.todo.filter(t => t.IsInComing()),
      Overdue: this.todo.filter(t => t.IsOverDue()),
      Completed: this.todo.filter(t => t.IsCompleted()),
    };
    this._chartCache = [
      {
        name: '正在進行',
        value: this.InProgress.length
      },

      {
        name: '即將到來',
        value: this.InComing.length
      },

      {
        name: '已過期',
        value: this.Overdue.length
      },

      {
        name: '已完成',
        value: this.Completed.length
      },
    ]
  }
}

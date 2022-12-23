import { WebService } from '@shared/services/web.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { saveAs } from 'file-saver-es';

const DEFAULT_FILENAME = '未命名';

export interface INote {
  name: string;
  content: string;
}

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})

export class NotepadComponent implements OnInit, OnDestroy {

  static IconName = 'notes';
  static AppName = '記事本'

  activedNote?: INote;
  activedIndex?: number;
  notes?: Array<INote>;

  content = ''
  fileName = DEFAULT_FILENAME
  modified = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webServ: WebService) {
    const rawNotes = localStorage.getItem(LocalStorageKey.notes);
    this.notes = rawNotes ? JSON.parse(rawNotes) : [];
    this.route.queryParams.subscribe((params) => {

      this.webServ.hideToolbar = true;
      this.activedIndex = Number(params?.['index']);
      if (!this.activedIndex) {
        return;
      }
      this.loadNote();
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
  }

  newFile() {
    this.checkIfModified();
    this.fileName = DEFAULT_FILENAME;
    this.content = ''
    this.modified = false;

  }

  openFile() {
    this.checkIfModified();
    const inputEl = document.createElement('input');
    inputEl.type = 'file'
    inputEl.accept = '.txt, .json, .xml, .html';
    inputEl.onchange = (ev) => {
      if (!inputEl.files?.length) {
        return;
      }
      const selectedFile = inputEl.files[0];
      this.fileName = selectedFile.name;
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = () => {
        this.content = reader.result as string;
      };
    }
    inputEl.click();
    this.modified = false;

  }

  checkIfModified() {
    if (this.modified) {
      if (confirm(`${this.fileName} 已被變更, 是否儲存？`)) {
        this.save();
        this.modified = false;
        return;
      }
    }
    return;
  }
  back() {
    this.checkIfModified();
    this.router.navigate(['..']);
  }

  onblur() {
    console.log('blur')
    if (!this.fileName?.trim()?.length) {
      this.fileName = DEFAULT_FILENAME
    }
  }
  save() {
    const blob = new Blob([this.content],
      { type: 'text/plain;charset=utf-8' });
    return saveAs(blob, `${this.fileName}${this.fileName.includes('.') ? '' : '.txt'}`);
  }
  selectNote(index: number) {
    this.router.navigate(['./'], { queryParams: { 'index': index } });
  }

  loadNote() {
    if (!this.activedIndex || !this.notes) {
      return;
    }

    try {
      this.activedNote = this.notes[this.activedIndex];
    } catch (err) {
      alert('記錄讀取失敗！');
      this.activedIndex = undefined;
    }
  }
}

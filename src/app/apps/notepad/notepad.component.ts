
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageKey } from '@shared/LocalStorageKey';

export interface INote {
  name: string;
  content: string;
}

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  activedNote?: INote;
  activedIndex?: number;
  notes?: Array<INote>;

  constructor(private route: ActivatedRoute, private router: Router) {
    const rawNotes = localStorage.getItem(LocalStorageKey.notes) ;
    this.notes = rawNotes ? JSON.parse(rawNotes) : [];
    this.route.queryParams.subscribe((params) => {
      this.activedIndex = Number(params?.['index']);
      if (!this.activedIndex) {
        return;
      }
      this.loadNote();
    })
  }

  ngOnInit(): void {
  }

  selectNote(index: number) {
    this.router.navigate(['./'], {queryParams: {'index' : index}});
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

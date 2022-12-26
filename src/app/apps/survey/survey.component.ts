import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '@shared/services/web.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  static IconName = 'article';
  static AppName = '自我認同表'

  @ViewChild('result') result!: ElementRef<any>

  @ViewChild('resultDialog') resultDialog!: TemplateRef<any>

  resultImageSrc = ''
  options = [
    ['男性', '中性', '女性'],
    ['超陽剛', '中性', '超陰柔'],
    ['異性戀', '雙、泛性戀', '同性戀'],
    ['無性慾', '有性慾', '高度性慾'],
    ['無戀愛傾向', '有戀愛情感的', '容易戀愛的'],
    ['單一伴侶', '接受開放關係', '多角戀的'],
    ['純純的性愛', '有點好奇', '全部的BDSM'],
    ['人類', '獸人', '純獸']
  ]

  editingOption?: Array<string>
  editingIndex?: number;

  constructor(
    private webServ: WebService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.webServ.hideToolbar = true;
  }

  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
  }

  shareWebsite() {
    const shareData = {
      title: '自我認同表',
      text: '到底誰會為了這個跟風還寫網頁啊',
      url: 'https://husano896.github.io/pwa/#/survey'
    }
    navigator.share(shareData);
  }

  async shareResult() {
    console.log(this.result);
    const canvasResult = await html2canvas(this.result.nativeElement)
    const url = canvasResult.toDataURL("image/jpeg");
    this.resultImageSrc = url;
    this.dialog.open(this.resultDialog)
  }
  closeResult() {
    this.dialog.closeAll();
  }
  back() {
    this.router.navigate(['..']);
  }

  isEditingOption(options: Array<string>, index: number) {
    return this.editingOption === options && this.editingIndex === index;
  }
  setEditingOption(options?: Array<string>, index?: number) {
    this.editingOption = options;
    this.editingIndex = index;
  }

  addItem() {
    this.options.push(['','',''])
  }

  removeItem(opt: Array<string>) {
    this.options = this.options.filter(option => option !== opt);
  }
}

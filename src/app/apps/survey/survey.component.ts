import dayjs from 'dayjs-es';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { WebService } from '@shared/services/web.service';

import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver-es';

const defaultOptions = [
  ['男性', '中性', '女性'],
  ['超陽剛', '中性', '超陰柔'],
  ['異性戀', '雙、泛性戀', '同性戀'],
  ['無性慾', '有性慾', '高度性慾'],
  ['無戀愛傾向', '有戀愛情感的', '容易戀愛的'],
  ['單一伴侶', '接受開放關係', '多角戀的'],
  ['純純的性愛', '有點好奇', '全部的BDSM'],
  ['人類', '獸人', '純獸']
]

const defaultOptions_en = [
  ['Male', 'Netural', 'Female'],
  ['Masculine', 'Netural', 'Feminine'],
  ['HetroSexual', 'Bisexual', 'Homosexual'],
  ['No lust', 'Some lust', 'High lust'],
  ['No love', 'Some love', 'Easily fall in love'],
  ['Single partner', 'Open relationship', 'Polyamorous'],
  ['Pure sex', 'Curious about kinks', 'Lots of kinks'],
  ['Human', 'Anthro', 'Feral']
]

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  static IconName = 'article';
  static AppName = '自我認同表'

  /**  用於輸出結果的element */
  @ViewChild('result') result!: ElementRef<any>

  options = defaultOptions;

  editingOption?: Array<string>
  editingIndex?: number;
  editingString?: string;
  sharing?: boolean;
  userName?: string;

  constructor(
    private webServ: WebService,
    private route: ActivatedRoute,
    private changeDetectionRef: ChangeDetectorRef) { }

  // 這功能會隱藏原本有的動作列！
  ngOnInit(): void {
    this.webServ.hideToolbar = true;

    // Query參數訂閱
    this.route.queryParams.subscribe((params: any) => {
      if (!params) {
        return;
      }
      // 語言參數
      // Set完會一直觸發 為什麼！？
      // 只能靠CurrentLanguage辨認有沒有改
      if (params.l) {
        switch (params.l) {
          case 'en':
            this.options = defaultOptions_en
            break;
          default:
            this.options = defaultOptions
            break;
        }

      }
    });
  }

  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
  }

  /** 分享這網站給你的損友們 */
  shareWebsite() {
    const shareData = {
      title: '自我認同表',
      text: '到底誰會為了這個跟風還寫網頁啊',
      url: location.href
    }
    navigator.share(shareData);
  }

  async shareResult() {
    console.log(this.result);
    this.sharing = true;
    // 變更變數後要先進行變更偵測才能反映截圖時隱藏的選項！
    this.changeDetectionRef.detectChanges();
    const url = await htmlToImage.toJpeg(this.result.nativeElement, { quality: 0.95 });

    const fileName = `${dayjs().format('YYYYMMDD_HHmmss.jpg')}`
    if (window.saveAs) {
      window.saveAs(url, fileName);
    } else {
      saveAs(url, fileName);
    }

    this.sharing = false;
    this.changeDetectionRef.detectChanges();
  }
  back() {
    this.webServ.back();
  }

  isEditingOption(options: Array<string>, index: number) {
    return this.editingOption === options && this.editingIndex === index;
  }
  setEditingOption(options?: Array<string>, index?: number) {
    this.editingOption = options;
    this.editingIndex = index;
    if (options !== undefined && index !== undefined) {
      this.editingString = options[index];
    }
  }

  // 對應直接用ngModel會失焦的問題
  onValueChange($event: string) {
    this.editingString = $event;
  }

  saveValueChange() {
    this.editingOption![this.editingIndex!] = this.editingString ?? '';
    this.setEditingOption();
  }

  addItem() {
    this.options.push(['', '', ''])
  }

  removeItem(opt: Array<string>) {
    this.options = this.options.filter(option => option !== opt);
  }
}

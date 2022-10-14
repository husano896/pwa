import { TooltipService } from './../../../@shared/services/tooltip.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '@shared/services/web.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  static IconName = 'home';
  static AppName = '首頁'
  constructor(private webServ: WebService, private tooltipServ: TooltipService) { }

  ngOnInit(): void {
  }
  get openedTimes() {
    return this.webServ.openedTimes;
  }

  getTooltip() {
    return this.tooltipServ.getTooltip();
  }

  /** 因matTooltipTouchGestures還是沒辦法防止內建的長壓事件 因此額外阻擋事件 */
  prevent($event: Event) {
    $event.preventDefault();
  }
}

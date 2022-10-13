import { TooltipService } from './../../../@shared/services/tooltip.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '@shared/services/web.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private webServ: WebService, private tooltipServ: TooltipService) { }

  ngOnInit(): void {
  }
  get openedTimes() {
    return this.webServ.openedTimes;
  }

  getTooltip() {
    return this.tooltipServ.getTooltip();
  }
}

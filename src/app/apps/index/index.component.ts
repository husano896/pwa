import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private webServ: WebService) { }

  ngOnInit(): void {
  }
  public get openedTimes() {
    return this.webServ.openedTimes;
  }
}

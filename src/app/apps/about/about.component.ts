import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  static IconName = 'info';
  static AppName = '關於'
  constructor() { }

  ngOnInit(): void {
  }

}

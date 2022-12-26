import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  static IconName = 'article';
  static AppName = '自我認同表'

  constructor() { }

  ngOnInit(): void {
  }

}

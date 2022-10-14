import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-eviat',
  templateUrl: './eviat.component.html',
  styleUrls: ['./eviat.component.scss']
})
export class EviatComponent implements OnInit {
  @ViewChild('eviat') eviat!: ElementRef<HTMLImageElement>;
  static IconName = 'sports_soccer';
  static AppName = '夢夢'

  animations = [
    'shaking',
    'invert',
    'fadeout',
    'rotate',
    'squeeze',
    'squeezed',
    'moveleft',
    'jumpjump'
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onEviatClick() {
    const currentState = this.eviat.nativeElement.className;
    if (!currentState) {
      this.eviat.nativeElement.className = this.animations[Math.floor(Math.random() * this.animations.length)];
    } else {
      this.eviat.nativeElement.className = '';
    }
  }
}

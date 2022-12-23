import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

// 直向最小的縮放程度 (同時影響橫向最大縮放程度)
const minHeightScale = 0.6;

@Component({
  selector: 'app-asiaminor',
  templateUrl: './asiaminor.component.html',
  styleUrls: ['./asiaminor.component.scss']
})
export class AsiaMinorComponent implements OnInit {

  static IconName = 'sports_soccer';
  static AppName = '小亞可愛'

  @ViewChild('asiaminor', { static: false }) awoo?: ElementRef<HTMLImageElement>

  private movedY = 0;
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(ev: PointerEvent): void {
    const deltaY = ev.movementY;
    this.movedY = Math.max(0, Math.min(this.movedY + deltaY, 512))

    // 調整小亞的縮放程度
    const scaleX = 1 + (minHeightScale * this.movedY / 512);
    const scaleY = 1 / scaleX;
    this.awoo!.nativeElement.style.transform = `scale(${scaleX}, ${scaleY})`;
    ev.preventDefault();
  }
}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

// 直向最小的縮放程度 (同時影響橫向最大縮放程度)
const minHeightScale = 0.25;

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
  private lastY: number | null = null;
  constructor() { }

  ngOnInit(): void {
  }


  @HostListener('document:pointerdown', ['$event'])
  onPointerDown(ev: PointerEvent): void {
    this.lastY = ev.y;
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(ev: PointerEvent): void {
    if (this.lastY == null) {
      return;
    }
    const deltaY = ev.y - this.lastY;
    this.movedY = Math.max(0, Math.min(this.movedY + deltaY, 512))

    // 調整小亞的縮放程度
    const scaleX = 1 + (minHeightScale * this.movedY / 512);
    const scaleY = 1 / scaleX;
    this.awoo!.nativeElement.style.transform = `scale(${scaleX}, ${scaleY})`;
    this.lastY = ev.y;
    ev.preventDefault();
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(ev: PointerEvent): void {
    this.lastY = null;
  }

}

import { FlexLayoutModule } from '@angular/flex-layout';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatteryService } from '@shared/services/battery.service';

@Component({
  selector: 'xfly-ether-clock',
  templateUrl: './xfly-ether-clock.component.html',
  styleUrls: ['./xfly-ether-clock.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class XflyEtherClockComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private requestFrame?: number;
  private gradient?: CanvasGradient;

  constructor(private batteryService: BatteryService) { }
  ngAfterViewInit(): void {
    if (!this.canvas) {
      return;
    }
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (!this.ctx) {
      return;
    }

    this.ctx.textAlign = "center";
    this.gradient = this.ctx.createLinearGradient(0, 0, this.canvas.nativeElement.width, 0);
    this.gradient.addColorStop(0, " magenta");
    this.gradient.addColorStop(0.5, "blue");
    this.gradient.addColorStop(1.0, "red");
    this.canvasUpdate();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.requestFrame!);
  }
  canvasUpdate() {
    if (!this.ctx) {
      return;
    }
    this.requestFrame = window.requestAnimationFrame(this.canvasUpdate.bind(this));

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const currentDate = new Date()
    const currentTime = currentDate.getTime(); // in ms
    const sec = (currentTime / 1000) % 60;
    const minutes = (currentTime / 60000) % 60;
    const hours = (currentTime / 3600000 - new Date().getTimezoneOffset() / 60 + 24) % 24;

    // 圓環的繪製
    // 秒數角度的起始點: 12點鐘方向, 最外圈
    const plusRad = Math.PI * 2 * sec / 60;
    const startRadSecond = -Math.PI / 2 + plusRad;
    this.ctx.fillStyle = "#00ccff";
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 480, startRadSecond, Math.PI * 2 * sec / 60 + startRadSecond);
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 432, Math.PI * 2 * sec / 60 + startRadSecond, startRadSecond, true);
    this.ctx.fill();

    // 分角度的起始點: 4點鐘方向, 中間圈
    const startRadMinute = -Math.PI / 2 + Math.PI * 2 / 3 + plusRad;
    this.ctx.fillStyle = "#00cccc";
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 408, startRadMinute, Math.PI * 2 * minutes / 60 + startRadMinute);
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 384, Math.PI * 2 * minutes / 60 + startRadMinute, startRadMinute, true);
    this.ctx.fill();

    // 小時角度的起始點: 8點鐘方向, 最內圈
    const startRadHour = -Math.PI / 2 + Math.PI * 4 / 3 + plusRad;
    this.ctx.fillStyle = "#00cc99"; //blue
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 360, startRadHour, Math.PI * 2 * hours / 24 + startRadHour);
    this.ctx.arc(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, 348, Math.PI * 2 * hours / 24 + startRadHour, startRadHour, true);
    this.ctx.fill();

    let widthStart = this.canvas.nativeElement.width / 2
    let heightStart = this.canvas.nativeElement.height / 2
    // 秒數文字繪製
    this.ctx.font = '320px Sitka Text';
    this.ctx.filter = 'drop-shadow(0px 8px 8px blue)';
    this.ctx.fillStyle = 'lightskyblue';

    this.ctx.fillText(`${sec >= 10 ? '' : '0'}${Math.floor(sec)}`,
      widthStart, heightStart - 16);

    // 時分文字繪製
    this.ctx.font = '192px Sitka Text';
    this.ctx.fillText(`${hours >= 10 ? '' : '0'}${Math.floor(hours)}:${minutes >= 10 ? '' : '0'}${Math.floor(minutes)}`,
      widthStart, heightStart + 192);


    // (如果有的) 電池繪製
    if (this.batteryService.battery) {
      const percent = this.batteryService.getPercent()
      // 電量長條繪製
      this.ctx.filter = 'none';
      this.ctx.fillStyle = 'gray';
      this.ctx.fillRect(widthStart - 100, heightStart + 304, 200, 8);
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillRect(widthStart - 100, heightStart + 304, 2 * percent, 8);
      if (percent < 100 && this.batteryService.battery.charging) {
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(widthStart - 100, heightStart + 304, 2 * percent * ((sec % 6) / 6), 8);
      }
      // 電量文字繪製
      this.ctx.fillStyle = 'yellow';
      this.ctx.filter = 'drop-shadow(0px 4px 2px darkorange)';
      this.ctx.font = '48px Sitka Text';
      this.ctx.fillText(`${this.batteryService.battery.charging ? '⚡' : ''}${percent}%`, widthStart, heightStart + 288);
    }

    this.ctx.filter = 'none';
  }
}

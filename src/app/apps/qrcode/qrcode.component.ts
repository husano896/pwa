import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Exception, Result } from '@zxing/library';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  static IconName = 'qr_code_scanner';
  static AppName = 'QR Code掃描器'

  @ViewChild('scanner', { static: false })
  scanner?: ZXingScannerComponent;
  result?: string;

  noDevice?: boolean;
  lastError?: any;
  constructor() { }

  ngOnInit(): void {
  }

  isOpenable() {
    return this.result?.includes('://');
  }
  open() {
    open(this.result);
  }

  onScanSuccess($event: string) {
    console.log($event);
    this.result = $event;
  }

  onScanError($event: Error) {
    console.log($event);
  }

  onScanFailure($event: Exception | undefined) {
    console.log($event);
  }

  onScanComplete($event: Result) {
    console.log($event);
  }

  onCamerasFound($event: MediaDeviceInfo[]) {
    console.log($event);
  }
  /**
   * Emits events when no cameras are found, will inject an exception (if available) to the callback.
   */
  onCamerasNotFound($event: any) {
    console.log($event);
    this.lastError = $event;
  }
  /**
   * Emits events when the users answers for permission.
   */
  onPermissionResponse($event: boolean) {
    console.log($event);
  }
  /**
   * Emits events when has devices status is update.
   */
  onHasDevices($event: boolean) {
    console.log($event);
    this.noDevice = !$event;
  }
}

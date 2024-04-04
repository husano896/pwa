import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageKey } from '@shared/LocalStorageKey';

import { Exception, Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss']
})
export class ShopScannerComponent implements OnInit {

  allowedFormats = [BarcodeFormat.CODABAR, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128,];

  createForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  })
  static readonly IconName = 'qr_code_scanner';
  static readonly AppName = '掃描器+查價器'

  result?: string;

  noDevice?: boolean;
  lastError?: any;
  constructor() { }

  ngOnInit(): void {
  }

  isOpenable() {
    return this.result?.includes('://');
  }
  onCreateClick() {
    this.products.push(this.createForm.value);
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
    this.result = $event.getText();
    this.createForm.patchValue({ id: this.result });
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

  _products: Array<any>;
  get products() {
    if (this._products) {
      return this._products;
    }

    try {
      this._products = JSON.parse(LocalStorageKey.scannerProducts);
      if (!(this._products instanceof Array)) {
        console.warn('[ShopScanner]', this._products, '讀出格式錯誤！');
        throw new Error();
      }
    }
    catch (err) {
      this.products = [];
      localStorage.setItem(LocalStorageKey.scannerProducts, JSON.stringify([]))
    }
    return this._products;
  }

  set products(v: Array<any>) {
    this._products = v;
    localStorage.setItem(LocalStorageKey.scannerProducts, JSON.stringify(v))
  }
}

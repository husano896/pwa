import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageKey } from '@shared/LocalStorageKey';

import { Exception, Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import _ from 'lodash';
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
    price: new FormControl(0, [Validators.required, Validators.min(1)])
  })
  static readonly IconName = 'qr_code_scanner';
  static readonly AppName = '掃描器+查價器'

  result?: string;

  noDevice?: boolean;
  lastError?: any;
  stop: boolean;
  tryHarder: boolean = true;
  showList: boolean;
  products: { [id: string]: any } = {};
  constructor(
    private matSnackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    try {
      this.products = JSON.parse(localStorage.getItem(LocalStorageKey.scannerProducts))
      if (!this.products) {
        this.products = {}
      }
    }
    catch (err) {
      this.products = {}
    }
  }

  onCreateClick() {
    this.products[this.createForm.value.id] = this.createForm.value;
    localStorage.setItem(LocalStorageKey.scannerProducts, JSON.stringify(this.products));
    this.matSnackbar.open(
      `新增項目 ${this.createForm.value.name} (${this.createForm.value.id})成功.`,
      '',
      { duration: 3000, panelClass: 'mat-positive-bg' }
    )
    this.createForm.reset()
    this.result = null;
  }

  onEditClick(product) {
    this.products[product.id] = null;
    this.createForm.patchValue(product);
  }
  onScanSuccess($event: string) {
    console.log($event);
    this.result = $event;

    this.createForm.patchValue({ id: this.result, name: '', price: 0 });
  }

  onScanError($event: Error) {
    console.log($event);
    this.lastError = $event;
  }

  onScanFailure($event: Exception | undefined) {
    // console.log($event);

  }

  onScanComplete($event: Result) {
    // console.log($event);
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
    alert('沒有可使用的相機！')
  }
  /**
   * Emits events when the users answers for permission.
   */
  onPermissionResponse($event: boolean) {
    console.log($event);
    if (!$event) {
      alert('請允許相機使用權限！')
    }
  }
  /**
   * Emits events when has devices status is update.
   */
  onHasDevices($event: boolean) {
    console.log($event);
    this.noDevice = !$event;
  }

  onImportClick() {
    this.stop = true;
    const data = window.prompt('請輸入資料:');
    try {
      if (!data.length) {
        alert('未輸入資料.')
        this.stop = false;
        return;
      }
      const newProducts = JSON.parse(data)
      this.products = _.merge(this.products, newProducts)
      const loadedProductCount = Object.keys(newProducts);
      alert(`匯入${loadedProductCount}項目.（若原本已有的將覆蓋）`)
    } catch (err) {
      alert('資料輸入失敗！')
    }

    this.stop = false;
  }

  onExportClick() {
    this.stop = true;
    navigator.clipboard.writeText(JSON.stringify(this.products));

    // Alert the copied text
    alert('已將資料複製到剪貼簿！');
    this.stop = false;
  }

  get productList() {
    return Object.values(this.products);
  }
}

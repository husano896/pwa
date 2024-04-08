import { Component, OnInit,  } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageKey } from '@shared/LocalStorageKey';

import { Exception, Result, BarcodeFormat } from '@zxing/library';
import _ from 'lodash-es';

interface IProduct {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss']
})


export class ShopScannerComponent implements OnInit {

  allowedFormats = [BarcodeFormat.CODABAR, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128,];

  createForm = new UntypedFormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  static readonly IconName = 'qr_code_scanner';
  static readonly AppName = '掃描器+查價器'

  /** 掃描結果 */
  result?: string;

  /** 無可使用裝置 */
  noDevice?: boolean;

  /** 最後出現的錯誤 */
  lastError?: any;

  /** 匯出匯入途中使用：暫時停止掃描 */
  stop: boolean;

  /** 是否用力檢測（可能會誤差） */
  tryHarder: boolean = true;

  /** 是否顯示商品列表 */
  showList: boolean;

  /** 相機列表 */
  cameras: MediaDeviceInfo[];

  /** 啟用中的相機 */
  camera: MediaDeviceInfo;
  products: { [id: string]: IProduct } = {};
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

  onSaveClick() {
    this.createForm.patchValue({ id: this.result });
    this.products[this.createForm.value.id] = this.createForm.value;
    localStorage.setItem(LocalStorageKey.scannerProducts, JSON.stringify(this.products));
    this.matSnackbar.open(
      `儲存項目 ${this.createForm.value.name} (${this.createForm.value.id})成功.`,
      '',
      { duration: 3000, panelClass: 'mat-positive-bg' }
    )
    this.createForm.reset()
    this.result = null;
  }

  onEditClick(product: IProduct) {
    this.result = product.id;
    this.createForm.patchValue(product);
  }

  onScanSuccess($event: string) {
    console.log($event);
    this.result = $event;

    this.createForm.patchValue({ id: null, name: '', price: 0 });
  }

  onScanError($event: Error) {
    console.log($event);
    this.lastError = $event;
  }

  onScanFailure($event: Exception | undefined) {
    // console.log($event);
    if (!$event) {
      return;
    }
  }

  onScanComplete($event: Result) {
    // console.log($event);
    if (!$event) {
      return;
    }
  }

  onCamerasFound($event: MediaDeviceInfo[]) {
    console.log($event);
    this.cameras = $event;
    this.camera = (this.camera ? this.cameras?.find(c => c.deviceId === this.camera.deviceId) : null) || $event?.[0];
  }

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

  onDeviceChange(device: MediaDeviceInfo) {
    if (device?.deviceId === this.camera?.deviceId) {
      return;
    }
    this.camera = device;
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
      alert(`匯入${loadedProductCount.length}項目.（若原本已有的將覆蓋）`)
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

  onListEditClick(product: IProduct) {
    this.onEditClick(product);
  }
  onListDeleteClick(product: IProduct) {
    if (!window.confirm(`是否刪除 ${product.name} (${product.id})？`)) {
      return
    }
    const id = product.id;
    delete this.products[id];
    localStorage.setItem(LocalStorageKey.scannerProducts, JSON.stringify(this.products));
  }
  get productList() {
    return Object.values(this.products);
  }
}

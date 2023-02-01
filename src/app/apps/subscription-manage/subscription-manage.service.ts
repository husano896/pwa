import { LocalStorageKey } from '@shared/LocalStorageKey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrency } from '@shared/entities/SubscriptionManage/ICurrency';
import { SubscriptionManageSave } from '@shared/entities/SubscriptionManage/';

/** 預設使用的存檔 */
const DEFAULT_SAVE: SubscriptionManageSave = {
  displayCurrency: 'USDTWD',
  currency: undefined
}


@Injectable()
export class SubscriptionManageService {
  currency?: { [exchangeType: string]: ICurrency }

  currencyList?: Array<ICurrency>

  currencyError?: any
  save?: SubscriptionManageSave

  constructor(private _http: HttpClient) {
    this.loadFromLocalStorage();
    this._getCurrencies()
  }

  /**
   * 取得所有貨幣兌換匯率
   * 資料來源：https://tw.rter.info/howto_currencyapi.php
   */
  private _getCurrencies() {
    return this._http
      .get<{ [exchangeType: string]: ICurrency }>('https://tw.rter.info/capi.php')
      .subscribe(
        {
          next:
            (resp) => {
              this.currency = resp;
              this.save.currency = resp;
              this.currencyList = Object.entries(resp).map(([name, currency]) => ({ name, ...currency }))
              console.log('[SubscriptionManage]成功從https://tw.rter.info/capi.php取得貨幣資訊', resp);
              this.SaveToLocalStorage();
            },
          error: (err) => {
            this.currencyError = err;
          }
        })
  }

  /** 自LocalStorage讀取存檔 */
  private loadFromLocalStorage() {
    try {
      this.save = JSON.parse(localStorage.getItem(LocalStorageKey.subscriptionManage) || '');
      this.currency = this.save?.currency;
      this.currencyList = Object.entries(this.currency).map(([name, currency]) => ({ name, ...currency }))
    } catch (err) {
      console.warn('[SubscriptionManage] 讀檔時發生錯誤！', err);
    } finally {
      if (!this.save) {
        this.save = DEFAULT_SAVE;
      }
    }
  }

  /** 存檔至LocalStorage */
  SaveToLocalStorage() {
    try {
      localStorage.setItem(LocalStorageKey.subscriptionManage, JSON.stringify(this.save));
    } catch (err) {
      console.warn('[SubscriptionManage] 存檔時發生錯誤！', err);
    }
  }
}

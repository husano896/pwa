import { Currencies } from './Currencies';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrency } from '@shared/entities/SubscriptionManage/ICurrency';
import { SubscriptionManageSave } from '@shared/entities/SubscriptionManage/';
import _ from 'lodash-es'
/** 預設使用的存檔 */
const DEFAULT_SAVE: SubscriptionManageSave = {
  displayCurrency: 'TWD',
  subscriptionItems: [
    /** 範例用
    { name: 'iCloud 50GB', amount: 1, currency: 'USD' },
    { name: 'Spotify', amount: 30, currency: 'TWD' },
    { name: 'Pixiv fanbox', amount: 100, currency: 'JPY' },
     */
  ]
}


@Injectable()
export class SubscriptionManageService {
  currency?: { [exchangeType: string]: ICurrency } = Currencies

  currencyList?: Array<ICurrency>
  currencyNames?: Array<string>

  currencyError?: any
  _save?: SubscriptionManageSave

  constructor(private _http: HttpClient) {
    this.loadFromLocalStorage();
    this._getCurrencies()
  }

  /** 取得顯示幣種 */
  public get displayCurrency() {
    return this._save.displayCurrency;
  }

  /** 設定顯示幣種 */
  public set displayCurrency(value: string) {
    this._save.displayCurrency = value
    this.SaveToLocalStorage();
  }

  /** 訂閱中的項目 */
  public get subscriptionItems() {
    return this._save.subscriptionItems
  }
  /**
   * 轉換貨幣
   * @param from 來源貨幣
   * @param to 目標貨幣
   * @param amount 金額
   * @returns 轉換過的貨幣金額
   */
  public exchangeCurrency(from: string, to: string, amount: number): number {
    // 幣種相同時直接回傳
    if (from === to || amount === 0) {
      return amount
    }

    try {
      // 並非跟美金轉換時, 先轉換成美金
      // from → USD
      const ratioToUSD = this.currency[`USD${from}`].Exrate
      const USDAmount = amount / ratioToUSD
      // USD → Target
      const ratioToTarget = this.currency[`USD${to}`].Exrate
      const targetAmount = USDAmount * ratioToTarget
      return targetAmount
    } catch (err) {
      console.error(`[SubscriptionManage] 轉換貨幣 ${from} → ${to} 中發生錯誤！`, err)
      return 0;
    }
  }

  /**
   * 計算訂閱項目合計費用
   * @param to 目標貨幣
   * @returns 轉換成目標貨幣的訂閱合計費用
  */
  public getTotalExpense() {
    return _.sum(
      this._save.subscriptionItems.map(i => this.exchangeCurrency(i.currency, this._save.displayCurrency, i.amount))
    );
  }

  /**
 * 取得所有貨幣兌換匯率
 * 資料來源：https://tw.rter.info/howto_currencyapi.php
 */
  private _getCurrencies() {
    return this._http
      .get<{ [exchangeType: string]: ICurrency }>('/api/currency')
      .subscribe(
        {
          next:
            (resp) => {
              this.currency = resp;
              this._save.currency = resp;
              this.currencyList = Object.entries(resp).map(([name, currency]) => ({ name, ...currency }))
              this.currencyNames = this.currencyList
                .filter(l => l.name.startsWith('USD'))
                .map(l => l.name.length > 3 ? l.name.substring(3) : l.name)
                .sort();
              console.log('[SubscriptionManage] 成功取得貨幣資訊', resp);
              localStorage.setItem(LocalStorageKey.subscriptionManageCurrencies, JSON.stringify(this.currency));
            },
          error: (err) => {
            this.currencyError = err;
          }
        })
  }

  /** 自LocalStorage讀取存檔 */
  public loadFromLocalStorage() {
    try {
      this._save = JSON.parse(localStorage.getItem(LocalStorageKey.subscriptionManageSave) || 'null');
      this.currency = JSON.parse(localStorage.getItem(LocalStorageKey.subscriptionManageCurrencies) || 'null');

    } catch (err) {
      console.warn('[SubscriptionManage] 讀檔時發生錯誤！', err);
    } finally {
      if (!this._save) {
        this._save = DEFAULT_SAVE;
      }
      if (!this.currency) {
        this.currency = Currencies;
      }

      this.currencyList = Object.entries(this.currency).map(([name, currency]) => ({ name, ...currency }))
      this.currencyNames = this.currencyList
        .filter(l => l.name.startsWith('USD'))
        .map(l => l.name.length > 3 ? l.name.substring(3) : l.name)
        .sort();
    }
  }

  /** 存檔至LocalStorage */
  public SaveToLocalStorage() {
    try {
      localStorage.setItem(LocalStorageKey.subscriptionManageSave, JSON.stringify(this._save));
    } catch (err) {
      console.warn('[SubscriptionManage] 存檔時發生錯誤！', err);
    }
  }

}

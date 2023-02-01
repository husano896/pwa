import { ICurrency } from "./ICurrency";

export interface SubscriptionManageSave {
  /** 目前顯示的幣值 */
  displayCurrency: string;

  /** 最後一次取得的幣值清單 */
  currency?: { [exchangeType: string]: ICurrency }
}

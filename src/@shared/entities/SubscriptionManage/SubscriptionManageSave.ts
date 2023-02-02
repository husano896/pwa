import { ICurrency } from "./ICurrency";
import { SubscriptionManageDto } from "./SubscriptionManageDto";

export interface SubscriptionManageSave {
  /** 目前顯示的幣值 */
  displayCurrency: string;

  /** 最後一次取得的幣值清單 */
  currency?: { [exchangeType: string]: ICurrency }

  subscriptionItems?: Array<SubscriptionManageDto>
}

import { ICurrency } from "./ICurrency";
import { SubscriptionManageDto } from "./SubscriptionManageDto";

export interface SubscriptionManageSave {
  /** 目前顯示的幣值 */
  displayCurrency: string;

  /** 訂閱項目 */
  subscriptionItems?: Array<SubscriptionManageDto>

  /** 更新時間 */
  // Date格式他會自動轉成Firebase自有的 只好用成number...
  time?: number;

  /** 最後一次存檔的時間, 用來避免衝突用 */
  lastSaveTime?: number
}

import { SubscriptionManageDto } from "@shared/entities/SubscriptionManage/SubscriptionManageDto";

interface IPreset {
  name: string;
  children: SubscriptionManageDto[]
}

export const Presets: IPreset[] = [
  {
    name: '系統訂閱', children: [
      // 兩大手機系統龍頭
      { name: 'Google One', amount: null, currency: 'USD' },
      { name: 'iCloud', amount: null, currency: 'USD' },
    ]
  },
  {
    name: '社群網站', children: [
      // 社群網站
      { name: 'Twitter Blue', amount: 8, currency: 'USD' },
      // 加入茶貓 比說＿＿娘還簡單
      { name: 'TeaCat aka.TeaMeow', amount: null, currency: 'TWD' },
    ]
  },
  {
    name: '藝術創作', children: [
      // 藝術創作者
      { name: 'Pixiv Fanbox', amount: null, currency: 'JPY' },
      { name: 'Patreon', amount: null, currency: 'USD' },
    ]
  },
  {
    name: '電信商', children: [
      // 電信商
      { name: '中華電信', amount: null, currency: 'TWD' },
      { name: '台灣大哥大', amount: null, currency: 'TWD' },
      { name: '台灣之星', amount: null, currency: 'TWD' },
      { name: '遠傳電信', amount: null, currency: 'TWD' },
      { name: '亞太電信', amount: null, currency: 'TWD' },
    ]
  },
]

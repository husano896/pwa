import { Injectable } from '@angular/core';



interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number; // 0~1.00
  onchargingchange?: (ev?: any) => void;
  onchargingtimechange?: (ev?: any) => void;
  ondischargingtimechange?: (ev?: any) => void;
  onlevelchange?: (ev?: any) => void;
}

@Injectable({
  providedIn: 'root'
})
/** 電池資訊服務 */
export class BatteryService {

  // 電池
  battery?: BatteryManager;

  constructor() {
    this.initalizeBattery();
  }
  // 電池掛載
  initalizeBattery() {
    const nav: any = navigator;
    if (!nav || !nav.getBattery) {
      return;
    }
    console.log('[BatteryService] 電池服務啟動.');
    return nav.getBattery().then((battery: BatteryManager) => {
      battery.onchargingchange = this.onBatteryChange.bind(this);
      battery.onchargingtimechange = this.onBatteryChange.bind(this);
      battery.ondischargingtimechange = this.onBatteryChange.bind(this);
      battery.onlevelchange = this.onBatteryChange.bind(this);

      this.battery = battery;
    });
  }
  onBatteryChange($event: Event) {
    const b = $event.currentTarget as unknown as BatteryManager;
    this.battery = b;
  }

  getPercent() {
    if (!this.battery) {
      return 0;
    }
    return Math.round(this.battery?.level * 100);
  }
}

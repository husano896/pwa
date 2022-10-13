import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() { }

  getTooltip() {
    const currentHours = new Date().getHours();
    const currentWeekDay = new Date().getDay();
    // 半夜
    if (currentHours <= 5) {
      return '嘿！你怎麼這時間還沒睡？\n需要聊聊嗎？';
    } else if (currentHours <= 10) {
      switch (currentWeekDay) {
        case 0:
        case 6:
          return '早安～周末想好好休息呢？\n還是去哪走走呢？';
        case 1:
          return '啊啦，是不美麗的星期一，\n整理一下自己吧！';
        case 2:
        case 3:
        case 4:
          return '今天也要好好加油！'
        case 5:
          return '喔喔，星期五了！\n再撐一天，加油！';
      }
    } else if (currentHours <= 18) {
      switch (currentWeekDay) {
        case 0:
        case 6:
          return '午安，今天為止還順利嗎？\n累了不要太勉強哦！';
        case 1:
        case 2:
        case 3:
        case 4:
          return '好好上班，除了摸我之外不要看手機了！？'
        case 5:
          return '喔耶，準備要快樂周末！';
      }
    } else if (currentHours <= 22) {
      switch (currentWeekDay) {
        case 0:
          return '啊，周末快結束了，今天還開心嗎？'
        case 1:
        case 2:
        case 3:
        case 4:
          return '下班辛苦了！\n聽點音樂，上個VRC，刷個音遊，放鬆一下─'
        case 5:
          return '明天周末了，想要去哪裡玩嗎？帶著我一起去吧！'
        case 6:
          return '今天不論是出毛還是出去玩都辛苦了！好好休息─'
      }
    } // else if (currentHours <= 24) {
    return '時間晚囉！注意不要太晚睡！'

  }
}

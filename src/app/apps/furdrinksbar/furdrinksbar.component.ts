import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebService } from '@shared/services/web.service';

interface IDrink {
  name: string;
  ingredients?: string[];
  disabled?: boolean;
}
const drinks: IDrink[] = [
  { name: '可爾必思', ingredients: ['糖', '香料', '美好的東西'] },
  { name: '可樂', ingredients: ['糖', '香料', '美好的東西'], disabled: true },
  { name: '柳橙汁', ingredients: ['糖', '香料', '美好的東西'] },
  { name: '葡萄汁', ingredients: ['糖', '香料', '美好的東西'] },

  { name: '可爾必思', ingredients: ['糖', '香料', '美好的東西'] },
  { name: '可樂', ingredients: ['糖', '香料', '美好的東西'], disabled: true },
  { name: '柳橙汁', ingredients: ['糖', '香料', '美好的東西'] },
  { name: '葡萄汁', ingredients: ['糖', '香料', '美好的東西'] }
]

const tags = [
  '全部',
  '軟性飲料'
]
@Component({
  selector: 'app-furdrinksbar',
  templateUrl: './furdrinksbar.component.html',
  styleUrls: ['./furdrinksbar.component.scss']
})
export class FurdrinksbarComponent implements OnInit {
  static IconName = 'liquor';
  static AppName = 'TailShake搖尾吧'
  AppName = FurdrinksbarComponent.AppName;
  drinks = drinks;
  constructor(
    private webServ: WebService) {
    this.webServ.hideToolbar = true;
  }

  ngOnInit(): void {
  }

}

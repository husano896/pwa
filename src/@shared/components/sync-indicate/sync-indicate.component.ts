import { WebService } from '@shared/services/web.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sync-indicate',
  templateUrl: './sync-indicate.component.html',
  styleUrls: ['./sync-indicate.component.scss'],
})
export class SyncIndicateComponent {

  constructor(private firebaseServ: FirebaseService, private webServ: WebService) { }

  get user() {
    return this.firebaseServ.User;
  }

  get autoSync() {
    return this.webServ.autoSync;
  }

  getSyncTooltip() {
    if (!this.user) {
      return '未登入';
    }

    if (!this.autoSync) {
      return '未開啟自動同步'
    }

    return '已開啟自動同步'
  }
}

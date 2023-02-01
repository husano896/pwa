import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '@shared/services/web.service';
import { SubscriptionManageService } from './subscription-manage.service';

@Component({
  selector: 'app-subscription-manage',
  templateUrl: './subscription-manage.component.html',
  styleUrls: ['./subscription-manage.component.scss']
})
export class SubscriptionManageComponent implements OnInit {
  static IconName = 'subscriptions';
  static AppName = '訂閱項目管理器'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webServ: WebService,
    private serv: SubscriptionManageService) {

    this.route.queryParams.subscribe((params: any) => {
      this.webServ.hideToolbar = true;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.webServ.hideToolbar = false;
  }

  back() {
    this.router.navigate(['..']);
  }

  openAddDialog() {

  }

  get currency() {
    return this.serv.currency
  }

  get currencyList() {
    return this.serv.currencyList;
  }

  get displayCurrency() {
    return this.serv.save.displayCurrency;
  }

  get currencyError() {
    return this.serv.currencyError
  }
  set displayCurrency(value: string) {
    this.serv.save.displayCurrency = value
    this.serv.SaveToLocalStorage();
  }
}

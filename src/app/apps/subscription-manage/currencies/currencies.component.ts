import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '@shared/services/web.service';
import { SubscriptionManageService } from '../subscription-manage.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  /** 原始金額 */
  amount: number = 1;
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
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  exchangeCurrency(from: string, to: string, amount: number) {
    return this.serv.exchangeCurrency(from, to, amount);
  }

  get currencyList() {
    return this.serv.currencyList;
  }

  get currencyError() {
    return this.serv.currencyError
  }

  get displayCurrency() {
    return this.serv.displayCurrency;
  }
  get currencyNames() {
    return this.serv.currencyNames;
  }
  set displayCurrency(value: string) {
    this.serv.displayCurrency = value
  }
}

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  /** 新增或編輯表單 */
  formGroup = new FormGroup({
    /** 訂閱項目名稱 */
    name: new FormControl('', [Validators.required]),
    /** 所支付的金額 */
    amount: new FormControl(0, [Validators.required]),
    /** 所支付的幣種 */
    currency: new FormControl('TWD', [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webServ: WebService,
    private dialog: MatDialog,
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

  openEditDialog() {
    this.dialog.open(this.editDialog);
  }

  SaveForm() {
    this.dialog.closeAll();
  }

  exchangeCurrency(from: string, to: string, amount: number) {
    return this.serv.exchangeCurrency(from, to, amount);
  }

  get currency() {
    return this.serv.currency
  }
  get currencyList() {
    return this.serv.currencyList;
  }
  get currencyNames() {
    return this.serv.currencyNames;
  }

  get subscriptionItems() {
    return this.serv.subscriptionItems;
  }
  get currencyError() {
    return this.serv.currencyError
  }

  get displayCurrency() {
    return this.serv.displayCurrency;
  }

  get TotalExpense() {
    return this.serv.getTotalExpense()
  }

  set displayCurrency(value: string) {
    this.serv.displayCurrency = value
  }
}

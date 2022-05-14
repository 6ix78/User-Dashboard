import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { TransLog } from '../models/trans-log.model';
import { UserData } from '../models/user-data.model';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  userData: UserData;
  depositLogs: TransLog[];

  crypto = true;
  cryptoTapOpend = 'tap1';

  withdrawFormBTC: FormGroup;
  withdrawFormETH: FormGroup;
  withdrawFormRVN: FormGroup;
  withdrawFormLTCT: FormGroup;

  _balance_btc: any;
  _balance_eth: any;
  _balance_rvn: any;
  _balance_ltct: any;
  UserData: any;

  waitingTime = 1200;

  withdrawLogsLength = 0;
  withdrawLogs: any = [
    {
      _id: '',
      address: '',
      amount: 0,
      currency: '',
      transactionStatus: '',
      userID: '',
      createdAt: '',
      updatedAt: '',
      txn_id: '',
    },
  ];

  balances: any;
  dashboard: any;
  constructor(
    private sharedService: SharedService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.sharedService.isLoading.next(true);
    this.dashboardService.getUserData().subscribe({
      next: (res) => {
        this.userData = res;
        this.sharedService.isLoading.next(false);
      },
    });
    this.dashboardService.getWithdrawLogs().subscribe({
      next: (res) => {
        this.withdrawLogs = res;
      },
    });

    this.withdrawFormBTC = new FormGroup({
      addressBTC: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountBTC: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });

    this.withdrawFormETH = new FormGroup({
      addressETH: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountETH: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
    //////////////////////////////////
    this.withdrawFormRVN = new FormGroup({
      addressRVN: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountRVN: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
    //////////////////////////////////
    this.withdrawFormLTCT = new FormGroup({
      addressLTCT: new FormControl(null, {
        validators: [
          Validators.required,
          // Validators.minLength(34),
          // Validators.maxLength(34),
        ],
      }),
      amountLTCT: new FormControl(null, Validators.required),
      //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      // }),
    });
  }

  onWithdraw(currency: string) {
    this.sharedService.isLoading.next(true);
    console.log('inside withdraw');
    let _amount, _address;
    if (currency === 'BTC') {
      _amount = this.withdrawFormBTC.value.amountBTC;
      _address = this.withdrawFormBTC.value.addressBTC;
    } else if (currency === 'ETH') {
      _amount = this.withdrawFormETH.value.amountETH;
      _address = this.withdrawFormETH.value.addressETH;
    } else if (currency === 'RVN') {
      _amount = this.withdrawFormRVN.value.amountRVN;
      _address = this.withdrawFormRVN.value.addressRVN;
    } else if (currency === 'LTCT') {
      _amount = this.withdrawFormLTCT.value.amountLTCT;
      _address = this.withdrawFormLTCT.value.addressLTCT;
    }
    if (Number(_amount) > 0.0 && _address != null) {
      this.dashboardService
        .UserWithdrawRequest(currency, parseFloat(_amount), _address)
        .subscribe({
          next: (res) => {
            ///this is to display the notification
            this.sharedService.sentMessage.next({
              message:
                'the property has been added successfully wait for the confirmation',
              error: false,
            });
          },
          error: (err) => {
            console.log(err);
            this.sharedService.sentMessage.next({
              message: 'something went wrong ',
              error: true,
            });
          },
        });
    }
    this.sharedService.isLoading.next(false);
  }

  cryptoPlansTap1() {
    this.cryptoTapOpend = 'tap1';
  }
  cryptoPlansTap2() {
    this.cryptoTapOpend = 'tap2';
  }
  cryptoPlansTap3() {
    this.cryptoTapOpend = 'tap3';
  }
  cryptoPlansTap4() {
    this.cryptoTapOpend = 'tap4';
  }
}

import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  items = [
    {
      title: 'Best Value',
      package: {
        chips: 12000000,
        price: 249.99,
        currency: 'USD',
      },
    },
    {
      title: ' ',
      package: {
        chips: 3500000,
        price: 99.99,
        currency: 'USD',
      },
    },
    {
      title: ' ',
      package: {
        chips: 1250000,
        price: 49.99,
        currency: 'USD',
      },
    },
    {
      title: 'Most Popular',
      package: {
        chips: 325000,
        price: 19.99,
        currency: 'USD',
      },
    },
    {
      title: ' ',
      package: {
        chips: 140000,
        price: 9.99,
        currency: 'USD',
      },
    },
    {
      title: ' ',
      package: {
        chips: 65000,
        price: 4.99,
        currency: 'USD',
      },
    },
  ]

  public payPalConfig?: IPayPalConfig;

  selectedItem = {
    title: 'Most Popular',
    package: {
      chips: 325000,
      price: 19.99,
      currency: 'USD',
    },
  };

  user = new User();
  processingPayment = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initConfig();
    this.getUser();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypalClientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${this.selectedItem.package.price}`,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: `${this.selectedItem.package.price}`
                }
              }
            },
            items: [
              {
                name: 'Probot Plaground Chips',
                quantity: '1',
                description: `${this.selectedItem.package.chips} chips`,
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: `${this.selectedItem.package.price}`,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        shape: 'pill',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        this.user.chips += this.selectedItem.package.chips;
        this.authService.patchUser(this.user).subscribe(patchedUser => {
          this.user = patchedUser;
          this.processingPayment = false;
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.processingPayment = false;
      },
      onError: err => {
        console.log('OnError', err);
        this.processingPayment = false;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.processingPayment = true;
      },
    };
  }

  selectItem(item) {
    if (!this.processingPayment) {
      this.selectedItem = this.items[item];
    }
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
}

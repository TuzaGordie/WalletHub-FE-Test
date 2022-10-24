/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{monthly_payment_currency}} <br/>
                    <b>Late Payment Fee : {{late_payment_currency}}</b> <br/>
                </div>`
})
export class Test01Component {

    @Input('amount') loan_amount: number = 3500.50;
    monthly_payment: number = 200;
    late_payment : number = 10;

    monthly_payment_currency: string;
    late_payment_currency: string;


    constructor() {
        this.monthly_payment = this.loan_amount ? this.loan_amount * 0.02 : null;
        this.late_payment = this.loan_amount ? this.monthly_payment * 0.05 : null;

        this.monthly_payment_currency = this.monthly_payment ?  this.formatCurrency(this.monthly_payment) : 'N/A'
        this.late_payment_currency = this.late_payment ? this.formatCurrency(this.late_payment) : 'N/A'
    }


    formatCurrency(amount: number) {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}
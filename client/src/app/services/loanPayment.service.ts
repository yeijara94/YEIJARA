import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class LoanPaymentService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public getLoanPayments(loan, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + 'loanPayments/' + loan._id, { headers: headers }).map(res => res.json());
    }

    public getLoanPaymentsPaginate(loan, page, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + 'loanPayments/' + loan._id + '/' + page, { headers: headers }).map(res => res.json());
    }

    public saveLoanPayment(loanPayment, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'loanPayment', JSON.stringify(loanPayment), { headers: headers }).map(res => res.json());
    }
}
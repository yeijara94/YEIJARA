import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class LoanService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public getLoans(user, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        if (user != null) {
            return this._http.get(this.url + 'loans/' + user._id, { headers: headers }).map(res => res.json());
        } else {
            return this._http.get(this.url + 'loans', { headers: headers }).map(res => res.json());
        }
    }

    public saveLoan(loan, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'loan', JSON.stringify(loan), { headers: headers }).map(res => res.json());
    }

    public updateLoan(loan, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'loan/' + loan._id, JSON.stringify(loan), { headers: headers }).map(res => res.json());
    }
}
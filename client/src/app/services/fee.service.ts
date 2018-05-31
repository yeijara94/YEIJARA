import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class FeeService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public getDues(user, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        if (user != null) {
            return this._http.get(this.url + 'dues/' + user._id, { headers: headers }).map(res => res.json());
        } else {
            return this._http.get(this.url + 'dues', { headers: headers }).map(res => res.json());
        }
    }

    public saveFee(fee, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'fee', JSON.stringify(fee), { headers: headers }).map(res => res.json());
    }

    public deleteFee(fee, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.delete(this.url + 'fee/' + fee._id, { headers: headers }).map(res => res.json());
    }
}
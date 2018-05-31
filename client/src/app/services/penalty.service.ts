import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class PenaltyService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public savePenalty(penalty, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'penalty', JSON.stringify(penalty), { headers: headers }).map(res => res.json());
    }
}
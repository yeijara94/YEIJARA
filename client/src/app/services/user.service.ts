import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public signUp(user_to_login, gethash = null) {
        if (gethash != null) {
            user_to_login.gethash = gethash;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.url + 'login', JSON.stringify(user_to_login), { headers: headers }).map(res => res.json());
    }

    public getIdentity() {
        return JSON.parse(sessionStorage.getItem('identity')) != 'undefined' ? JSON.parse(sessionStorage.getItem('identity')) : null;
    }

    public getToken() {
        return sessionStorage.getItem('token') != 'undefined' ? sessionStorage.getItem('token') : null;
    }

    public registerUser(user, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'register', JSON.stringify(user), { headers: headers }).map(res => res.json());
    }

    public listUsers(token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + 'list', { headers: headers }).map(res => res.json());
    }

    public updateUser(user, token) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'update-user/' + user._id, JSON.stringify(user), { headers: headers }).map(res => res.json());
    }
}
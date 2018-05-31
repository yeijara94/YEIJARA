import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    selector: 'yeijara-sidenav',
    templateUrl: 'sidenav.html',
    styleUrls: ['sidenav.component.css'],
    providers: [UserService]
})

export class SidenavComponent implements OnInit {
    public identity;
    public token;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    public logout() {
        sessionStorage.removeItem('identity');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate(['/']);
    }
}
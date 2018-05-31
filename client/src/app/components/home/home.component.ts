import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    selector: 'yeijara-home',
    templateUrl: 'home.html',
    styleUrls: ['home.component.css'],
    providers: [UserService]
})

export class HomeComponent implements OnInit {
    public identity;
    public token;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity === null) {
            this._router.navigate(['/']);
        }
    }

    public goNequi() {
        sessionStorage.setItem('nequi', 'true');
        this._router.navigate(['/nequi/home']);
    }
}
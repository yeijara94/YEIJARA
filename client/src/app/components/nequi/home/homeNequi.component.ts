import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
    selector: 'yeijara-home',
    templateUrl: 'home.html',
    styleUrls: ['homeNequi.component.css'],
    providers: [UserService]
})

export class HomeNequiComponent implements OnInit {

    public identity;
    public token;
    public options: Array<any>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
        this.options = new Array<any>();
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity === null) {
            this._router.navigate(['/']);
        }
        this.listOptions();
    }

    public listOptions() {
        this.options.push({
            name: 'Usuario',
            link: '/nequi/user'
        });
        this.options.push({
            name: 'Cuotas',
            link: '/nequi/fee'
        });
        this.options.push({
            name: 'Prestamos',
            link: '/nequi/loan'
        });
        this.options.push({
            name: 'Resumen',
            link: '/nequi/summary'
        });
    }
}
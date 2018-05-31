import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
    selector: 'yeijara-user',
    templateUrl: 'user.html',
    styleUrls: ['user.component.css'],
    providers: [UserService]
})

export class UserComponent implements OnInit {

    public identity;
    public token;
    public errorMessage;
    public user: User;
    public users: Array<User>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
        this.errorMessage = null;
        this.users = new Array<User>();
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.cleanUser();
        this.listUsers();
    }

    private listUsers() {
        this.users = new Array<User>();

        this._userService.listUsers(this.token).subscribe(
            response => {
                this.users = response.users;
            }, error => { console.error(error); }
        );
    }

    public chooseUser(user: User) {
        this.user = user;
    }

    public saveUser() {
        this.user.name = this.user.name.toUpperCase();
        this.user.pocketName = this.user.pocketName.toUpperCase();

        if (this.user._id != null && this.user._id.length > 0) {
            this._userService.updateUser(this.user, this.token).subscribe(
                response => {
                    this.cleanUser();
                    this.listUsers();
                }, error => { console.error(error); }
            );
        } else {
            this.user.profile = 'USER';
            this._userService.registerUser(this.user, this.token).subscribe(
                response => {
                    if (response.user != 'undefined' && response.user._id != null && response.user._id.length > 0) {
                        this.cleanUser();
                        this.listUsers();
                    }
                }, error => { console.error(error); }
            );
        }
    }

    public cleanUser() {
        this.user = new User('', '', 0, '', null, null, '', '', '', '');
    }
}
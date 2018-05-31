import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FeeService } from '../../../services/fee.service';
import { PenaltyService } from '../../../services/penalty.service';
import { User } from '../../../models/user';
import { Fee } from '../../../models/fee';
import { Penalty } from '../../../models/penalty';

declare var $: any;

@Component({
    selector: 'yeijara-fee',
    templateUrl: 'fee.html',
    styleUrls: ['fee.component.css'],
    providers: [UserService, FeeService, PenaltyService]
})

export class FeeComponent implements OnInit {

    public pass: number = 0;
    public totalSaved: number = 0;
    public identity;
    public token;
    public errorMessage;
    public user: User;
    public fee: Fee;
    public penalty: Penalty;
    public users: Array<User>;
    public dues: Array<Fee>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _feeService: FeeService, private _penaltyService: PenaltyService) {
        this.errorMessage = null;
        this.users = new Array<User>();
        this.dues = new Array<Fee>();
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.listUsers();
        this.clean();
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
        this.listFee();
    }

    private listFee() {
        this.pass = 0;
        this.totalSaved = 0;
        this.dues = new Array<Fee>();

        this._feeService.getDues(this.user, this.token).subscribe(
            response => {
                this.dues = response.dues;
                if (this.dues == null || this.dues.length <= 0) {
                    this.pass = 1;
                } else {
                    for (let i = 0; i < this.dues.length; i++) {
                        this.totalSaved += this.dues[i].value;
                    }
                }
            }, error => { console.error(error); }
        );
    }

    public getNextPass() {
        if (this.pass == 0) {
            this.pass++;
            this.fee.value = this.user.agreedFee;
        }
    }

    public saveFee() {
        this.fee.user = this.user._id;
        this._feeService.saveFee(this.fee, this.token).subscribe(
            response => {
                this.pass = 0;
                this.listFee();
                this.fee = new Fee('', '', null, 0, '', '');
            }, error => { console.error(error); }
        );
    }

    public cancelNewFee() {
        if (this.pass == 1) {
            this.pass--;
        }
        this.fee = new Fee('', '', null, 0, '', '');
    }

    public chooseFee(fee) {
        $('#modalFeeOptions').modal('show');
        this.fee = fee;
    }

    public deleteFee() {
        if (this.fee._id != null && this.fee._id.length > 0) {
            this._feeService.deleteFee(this.fee, this.token).subscribe(
                response => {
                    $('#modalFeeOptions').modal('hide');
                    this.listFee();
                }, error => { console.error(error); }
            );
        }
    }

    public savePenalty() {
        this.penalty.user = this.user._id;
        this.penalty.fee = this.fee._id;
        this._penaltyService.savePenalty(this.penalty, this.token).subscribe(
            response => {
                $('#modalFeeOptions').modal('hide');
            }, error => { console.error(error); }
        );
    }

    public clean() {
        this.user = new User('', '', 0, '', null, null, '', '', '', '');
        this.fee = new Fee('', '', null, 0, '', '');
        this.penalty = new Penalty('', '', '', null, 0, '');
    }
}
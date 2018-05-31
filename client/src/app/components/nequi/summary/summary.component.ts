import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FeeService } from '../../../services/fee.service';
import { PenaltyService } from '../../../services/penalty.service';
import { LoanService } from '../../../services/loan.service';
import { User } from '../../../models/user';
import { Fee } from '../../../models/fee';
import { Penalty } from '../../../models/penalty';

declare var $: any;

@Component({
    selector: 'yeijara-summary',
    templateUrl: 'summary.html',
    styleUrls: ['summary.component.css'],
    providers: [UserService, FeeService, PenaltyService, LoanService]
})

export class SummaryComponent implements OnInit {

    public totalDues: number = 0;
    public totalLoans: number = 0;
    public identity;
    public token;
    public errorMessage;
    public user: User;
    public fee: Fee;
    public penalty: Penalty;
    public users: Array<User>;
    public dues: Array<Fee>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _feeService: FeeService, private _penaltyService: PenaltyService, private _loanService: LoanService) {
        this.errorMessage = null;
        this.users = new Array<User>();
        this.dues = new Array<Fee>();
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.getDues();
        this.getLoans();
    }

    private getDues() {
        this.totalDues = 0;

        this._feeService.getDues(null, this.token).subscribe(
            response => {
                for (let i = 0; i < response.dues.length; i++) {
                    if (response.dues[i].status === 'ACTIVE') {
                        this.totalDues += response.dues[i].value;
                    }
                }
            }, error => { console.error(error); }
        );
    }

    private getLoans() {
        this.totalLoans = 0;

        this._loanService.getLoans(null, this.token).subscribe(
            response => {
                for (let i = 0; i < response.loans.length; i++) {
                    if (response.loans[i].status === 'ACTIVE') {
                        this.totalLoans += response.loans[i].value;
                    }
                }
            }, error => { console.error(error); }
        );
    }
}
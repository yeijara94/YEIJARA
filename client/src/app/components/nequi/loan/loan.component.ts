import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoanService } from '../../../services/loan.service';
import { PenaltyService } from '../../../services/penalty.service';
import { LoanPaymentService } from '../../../services/loanPayment.service';
import { User } from '../../../models/user';
import { Loan } from '../../../models/loan';
import { Penalty } from '../../../models/penalty';
import { LoanPayment } from '../../../models/loanPayment';

declare var $: any;

@Component({
    selector: 'yeijara-loan',
    templateUrl: 'loan.html',
    styleUrls: ['loan.component.css'],
    providers: [UserService, LoanService, PenaltyService, LoanPaymentService]
})

export class LoanComponent implements OnInit {

    public pass: number = 0;
    public totalSaved: number = 0;
    public totalLoan: number = 0;
    public page: number = 1;
    public totalPages: number;
    public totalLoanPayments: number;
    public identity;
    public token;
    public errorMessage;
    public writeAccount: boolean = false;
    public user: User;
    public loan: Loan;
    public loanPayment: LoanPayment;
    public pages: Array<number>;
    public accounts: Array<string>;
    public pockets: Array<string>;
    public users: Array<User>;
    public loans: Array<Loan>;
    public loanPayments: Array<LoanPayment>;
    public loanPaymentsPaginate: Array<LoanPayment>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _loanService: LoanService, private _penaltyService: PenaltyService, private _loanPaymentService: LoanPaymentService) {
        this.errorMessage = null;
        this.pages = new Array<number>();
        this.accounts = new Array<string>();
        this.pockets = new Array<string>();
        this.users = new Array<User>();
        this.loans = new Array<Loan>();
        this.loanPayments = new Array<LoanPayment>();
        this.loanPaymentsPaginate = new Array<LoanPayment>();
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
                this.listAccounts();
                this.listPockets();
            }, error => { console.error(error); }
        );
    }

    private listAccounts() {
        this.accounts = new Array<string>();

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].account != null && this.users[i].account.length > 0) {
                this.accounts.push(this.users[i].account);
            }
        }
    }

    private listPockets() {
        this.pockets = new Array<string>();

        for (let i = 0; i < this.users.length; i++) {
            this.pockets.push(this.users[i].pocketName);
        }
    }

    public chooseUser(user: User) {
        this.user = user;
        this.listLoan();
        this.loan = new Loan('', '', null, null, '', '', 0, 0, '');
    }

    private listLoan() {
        this.pass = 0;
        this.totalSaved = 0;
        this.loans = new Array<any>();

        this._loanService.getLoans(this.user, this.token).subscribe(
            response => {
                this.loans = response.loans;
                if (this.loans == null || this.loans.length <= 0) {
                    this.pass = 1;
                } else {
                    for (let i = 0; i < this.loans.length; i++) {
                        if (this.loans[i].status === 'ACTIVE') {
                            this.totalSaved += (this.loans[i].value + ((this.loans[i].value / 100) * this.loans[i].interestPercentage));
                        }
                    }
                }
            }, error => { console.error(error); }
        );
    }

    public getNextPass() {
        if (this.pass == 0) {
            this.pass++;
        }
    }

    public changeAccountMode() {
        if (this.writeAccount) {
            this.writeAccount = false;
        } else {
            this.writeAccount = true;
        }
    }

    public saveLoan() {
        this.loan.user = this.user._id;
        this.loan.status = 'ACTIVE';
        this._loanService.saveLoan(this.loan, this.token).subscribe(
            response => {
                this.pass = 0;
                this.listLoan();
                this.loan = new Loan('', '', null, null, '', '', 0, 0, '');
            }, error => { console.error(error); }
        );
    }

    public cancelNewLoan() {
        if (this.pass == 1) {
            this.pass--;
        }
        this.loan = new Loan('', '', null, null, '', '', 0, 0, '');
    }

    public chooseLoan(loan) {
        $('#modalPayment').modal('show');
        this.loan = loan;
        this.getLoanPayments();
    }

    private getLoanPayments() {
        this.loanPayments = new Array<LoanPayment>();

        this._loanPaymentService.getLoanPayments(this.loan, this.token).subscribe(
            response => {
                this.loanPayments = response.loanPayments;
                this.paidDebt();
                this.getLoanPaymentsPaginate();
            }, error => { console.error(error); }
        );
    }

    private getLoanPaymentsPaginate() {
        this.loanPaymentsPaginate = new Array<LoanPayment>();

        this._loanPaymentService.getLoanPaymentsPaginate(this.loan, this.page, this.token).subscribe(
            response => {
                this.loanPaymentsPaginate = response.loanPayments;
                this.totalLoanPayments = response.total_items;
                this.getPaginator();
            }, error => { console.error(error); }
        );
    }

    public paidDebt() {
        /*Se valida si la deuda ya fue cancelada, si es así se marca como Pagada*/
        this.totalLoan = (this.loan.value) + ((this.loan.value / 100) * this.loan.interestPercentage);
        for (let i = 0; i < this.loanPayments.length; i++) {
            if (!this.loanPayments[i].applyLoan) {
                this.totalLoan -= this.loanPayments[i].value;
            }
        }

        if (this.totalLoan <= 0 && this.loan.status === 'ACTIVE') {
            $('#modalPayment').modal('hide');
            this.loan.status = "CLOSED";
            this._loanService.updateLoan(this.loan, this.token).subscribe(
                response => {
                    this.loan = response.loan;
                    this.listLoan();
                }, error => { console.error(error); }
            );
        }
    }

    public changeInterest() {
        this.loanPayment.interest = !this.loanPayment.interest;
    }

    public changeApplyLoan() {
        this.loanPayment.applyLoan = !this.loanPayment.applyLoan;
    }

    public saveLoanPayment() {
        this.loanPayment.loan = this.loan._id;
        this._loanPaymentService.saveLoanPayment(this.loanPayment, this.token).subscribe(
            response => {
                this.getLoanPayments();
                this.listLoan();
                if (!this.loanPayment.applyLoan) {
                    this.totalSaved -= this.loanPayment.value;
                }
                this.loanPayment = new LoanPayment('', '', null, false, 0, false);
            }, error => { console.error(error); }
        );
    }

    private getPaginator() {
        this.pages = new Array<any>();
        let posStart;
        let totalPages = Math.ceil(this.totalLoanPayments / 2);

        console.log('*************************');
        console.log(totalPages);
        console.log('*************************');

        if (this.page > 1) {
            if (this.page + 1 <= totalPages) {
                posStart = this.page - 1;
            } else {
                posStart = this.page - 2;
            }
        } else {
            posStart = 1;
        }

        console.log('*************************');
        console.log(posStart);
        console.log('*************************');

        for (let i = posStart; i <= totalPages && (i - posStart) < 3; i++) {
            this.pages.push(i);
        }

        console.log('*************************');
        console.log(this.pages);
        console.log('*************************');
    }

    public getPage(page) {
        this.page = page;
        this.getLoanPaymentsPaginate();
    }

    public clean() {
        this.user = new User('', '', 0, '', null, null, '', '', '', '');
        this.loan = new Loan('', '', null, null, '', '', 0, 0, '');
        this.loanPayment = new LoanPayment('', '', null, false, 0, false);
    }
}
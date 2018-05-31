export class LoanPayment {

    constructor(
        public _id: string,
        public loan: string,
        public date: Date,
        public interest: boolean,
        public value: number,
        public applyLoan: boolean
    ) { }
}
export class Loan {

    constructor(
        public _id: string,
        public user: string,
        public date: Date,
        public agreedDate: Date,
        public account: string,
        public pocket: string,
        public interestPercentage: number,
        public value: number,
        public status: string
    ) { }
}
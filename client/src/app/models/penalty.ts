export class Penalty {

    constructor(
        public _id: string,
        public user: string,
        public fee: string,
        public date: Date,
        public value: number,
        public concept: string
    ) { }
}
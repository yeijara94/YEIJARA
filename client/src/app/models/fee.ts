export class Fee {

    constructor(
        public _id: string,
        public user: string,
        public date: Date,
        public value: number,
        public status: string,
        public image: string
    ) { }
}
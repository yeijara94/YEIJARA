export class User {

    constructor(
        public _id: string,
        public name: string,
        public agreedFee: number,
        public status: string,
        public start: Date,
        public end: Date,
        public account: string,
        public pocketName: string,
        public password: string,
        public profile: string
    ) { }
}
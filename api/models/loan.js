'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoanSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    date: Date,
    agreedDate: Date,
    account: String,
    pocket: String,
    interestPercentage: Number,
    value: Number,
    status: String
});

module.exports = mongoose.model('Loan', LoanSchema);
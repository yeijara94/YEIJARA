'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoanPaymentSchema = Schema({
    loan: { type: Schema.ObjectId, ref: 'Loan' },
    date: Date,
    interest: Boolean,
    value: Number,
    applyLoan: Boolean
});

module.exports = mongoose.model('LoanPayment', LoanPaymentSchema);
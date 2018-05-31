'use strict'

var express = require('express');
var LoanPaymentController = require('../controllers/loanPayment');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/loanPayments/:loan', md_auth.ensureAuth, LoanPaymentController.getLoanPayments);
api.get('/loanPayments/:loan/:page?', md_auth.ensureAuth, LoanPaymentController.getLoanPaymentPaginate);
api.post('/loanPayment', md_auth.ensureAuth, LoanPaymentController.saveLoanPayment);

module.exports = api;
'use strict'

var express = require('express');
var LoanController = require('../controllers/loan');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/loans', md_auth.ensureAuth, LoanController.listLoans);
api.get('/loans/:user', md_auth.ensureAuth, LoanController.getLoansUser);
api.post('/loan', md_auth.ensureAuth, LoanController.saveLoan);
api.put('/loan/:id', md_auth.ensureAuth, LoanController.updateLoan);

module.exports = api;
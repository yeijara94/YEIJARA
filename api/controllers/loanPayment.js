'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Loan = require('../models/loan');
var LoanPayment = require('../models/loanPayment');

function getLoanPayments(req, res) {
    var loanId = req.params.loan;

    var find = LoanPayment.find({ loan: loanId }).sort('date');

    find.populate({ path: 'loan' }).exec((err, loanPayments) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!loanPayments) {
                res.status(404).send({ message: 'No se encontraron pagos para el prestamo.' });
            } else {
                res.status(200).send({ loanPayments });
            }
        }
    });
}

function getLoanPaymentPaginate(req, res) {
    var loanId = req.params.loan;
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 2;

    var find = LoanPayment.find({ loan: loanId }).sort('date');

    find.paginate(page, itemsPerPage, function (err, loanPayments, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!loanPayments) {
                res.status(404).send({ message: 'No hay pagos para el prestamo !!' });
            } else {
                return res.status(200).send({
                    total_items: total,
                    loanPayments: loanPayments
                });
            }
        }
    });
}

function saveLoanPayment(req, res) {
    var loanPayment = new LoanPayment();
    var params = req.body;

    loanPayment.date = params.date;
    loanPayment.interest = params.interest;
    loanPayment.value = params.value;
    loanPayment.applyLoan = params.applyLoan;
    loanPayment.loan = params.loan;

    loanPayment.save((err, loanPaymentStored) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al guardar el pago de prestamo' });
        } else {
            if (!loanPaymentStored) {
                res.status(404).send({ message: 'El pago de prestamo no ha sido guardada' });
            } else {
                res.status(200).send({ loanPayment: loanPaymentStored });
            }
        }
    });
}

module.exports = {
    getLoanPayments,
    getLoanPaymentPaginate,
    saveLoanPayment
}
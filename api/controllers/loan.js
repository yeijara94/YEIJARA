'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Loan = require('../models/loan');
var User = require('../models/user');
var Penality = require('../models/penalty');

function listLoans(req, res) {
    Loan.find().exec((err, loans) => {
        if (err) {
            res.status(404).send({ message: 'Error al listar las coutas.' });
        } else if (!loans) {
            res.status(404).send({ message: 'No se encontraron coutas.' });
        } else {
            return res.status(200).send({ loans: loans });
        }
    });
}

function getLoansUser(req, res) {
    var userId = req.params.user;

    var find = Loan.find({ user: userId }).sort('date');

    find.populate({ path: 'user' }).exec((err, loans) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!loans) {
                res.status(404).send({ message: 'No se encontraron prestamos registradas.' });
            } else {
                res.status(200).send({ loans });
            }
        }
    });
}

function saveLoan(req, res) {
    var loan = new Loan();
    var params = req.body;

    loan.date = params.date;
    loan.agreedDate = params.agreedDate;
    loan.account = params.account;
    loan.pocket = params.pocket;
    loan.interestPercentage = params.interestPercentage;
    loan.value = params.value;
    loan.status = params.status;
    loan.user = params.user;

    loan.save((err, loanStored) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al guardar el prestamo' });
        } else {
            if (!loanStored) {
                res.status(404).send({ message: 'El prestamo no ha sido guardada' });
            } else {
                res.status(200).send({ loan: loanStored });
            }
        }
    });
}

function updateLoan(req, res) {
    var loanId = req.params.id;
    var update = req.body;

    Loan.findByIdAndUpdate(loanId, update, (err, loanUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la deuda' });
        } else {
            if (!loanUpdated) {
                res.status(404).send({ message: 'La deuda no ha sido actualizada' });
            } else {
                res.status(200).send({ loan: loanUpdated });
            }
        }
    });
}

module.exports = {
    listLoans,
    getLoansUser,
    saveLoan,
    updateLoan
}
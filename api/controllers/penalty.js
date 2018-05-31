var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Fee = require('../models/fee');
var User = require('../models/user');
var Penalty = require('../models/penalty');

function savePenalty(req, res) {
    var penalty = new Penalty();
    var params = req.body;

    penalty.date = params.date;
    penalty.value = params.value;
    penalty.concept = params.concept;
    penalty.user = params.user,
        penalty.fee = params.fee;

    penalty.save((err, penaltyStored) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al guardar la multa' });
        } else {
            if (!penaltyStored) {
                res.status(404).send({ message: 'La multa no ha sido guardada' });
            } else {
                res.status(200).send({ penalty: penaltyStored });
            }
        }
    });
}

module.exports = {
    savePenalty
}
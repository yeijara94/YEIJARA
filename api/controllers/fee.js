'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Fee = require('../models/fee');
var User = require('../models/user');
var Penality = require('../models/penalty');

function listDues(req, res) {
    Fee.find().exec((err, dues) => {
        if (err) {
            res.status(404).send({ message: 'Error al listar las coutas.' });
        } else if (!dues) {
            res.status(404).send({ message: 'No se encontraron coutas.' });
        } else {
            return res.status(200).send({ dues: dues });
        }
    });
}

function getFee(req, res) {
    var feeId = req.params.id;

    Fee.findById(feeId).populate({ path: 'user' }).exec((err, fee) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!fee) {
                res.status(404).send({ message: 'La cuota no existe.' });
            } else {
                res.status(200).send({ fee });
            }
        }
    });
}

function getDuesUser(req, res) {
    var userId = req.params.user;

    var find = Fee.find({ user: userId }).sort('date');

    find.populate({ path: 'user' }).exec((err, dues) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!dues) {
                res.status(404).send({ message: 'No se encontraron cuotas registradas.' });
            } else {
                res.status(200).send({ dues });
            }
        }
    });
}

function getFees(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Fee.find().sort('name').paginate(page, itemsPerPage, function (err, fees, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!fees) {
                res.status(404).send({ message: 'No hay cuotas !!' });
            } else {
                return res.status(200).send({
                    total_items: total,
                    fees: fees
                });
            }
        }
    });
}

function saveFee(req, res) {
    var fee = new Fee();
    var params = req.body;

    fee.date = params.date;
    fee.value = params.value;
    fee.status = params.status.toUpperCase();
    fee.image = 'null';
    fee.user = params.user;

    fee.save((err, feeStored) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al guardar la cuota' });
        } else {
            if (!feeStored) {
                res.status(404).send({ message: 'La cuota no ha sido guardada' });
            } else {
                res.status(200).send({ fee: feeStored });
            }
        }
    });
}

function updateFee(req, res) {
    var feeId = req.params.id;
    var update = req.body;

    Fee.findByIdAndUpdate(feeId, update, (err, feeUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la cuota' });
        } else {
            if (!feeUpdated) {
                res.status(404).send({ message: 'La cuota no ha sido actualizada' });
            } else {
                res.status(200).send({ fee: feeUpdated });
            }
        }
    });
}

function uploadImage(req, res) {
    var feeId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'git') {
            Fee.findByIdAndUpdate(feeId, { image: file_name }, (err, feeUpdated) => {
                if (!feeUpdated) {
                    res.status(500).send({ message: 'Error al actualizar la imagen de la cuota' });
                } else {
                    res.status(200).send({ image: file_name, fee: feeUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'Extensión del archivo no valida' });
        }
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen...' });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/fees/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' });
        }
    })
}

function deleteFee(req, res) {
    var feeId = req.params.id;

    Fee.findById(feeId).remove((err, feeRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la cuota' });
        } else {
            if (!feeRemoved) {
                res.status(404).send({ message: 'La cuota no ha sido eliminada' });
            } else {
                res.status(200).send({ fee: feeRemoved });
            }
        }
    });
}

module.exports = {
    listDues,
    getFee,
    getDuesUser,
    getFees,
    saveFee,
    updateFee,
    uploadImage,
    getImageFile,
    deleteFee
}
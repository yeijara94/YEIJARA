'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function listUsers(req, res) {
    User.find().sort('name').exec((err, users) => {
        if (err) {
            res.status(404).send({ message: 'Error al listar los usuarios.' });
        } else if (!users) {
            res.status(404).send({ message: 'No se encontraron usuarios.' });
        } else {
            return res.status(200).send({ users: users });
        }
    });
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.name = params.name.toUpperCase();
    user.agreedFee = params.agreedFee;
    user.status = params.status.toUpperCase();
    user.start = params.start;
    user.end = params.end;
    user.account = params.account;
    user.pocketName = params.pocketName.toUpperCase();
    user.password = params.password;
    user.profile = params.profile.toUpperCase();

    if (params.password) {
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
        });
    }

    if (user.name != null && user.agreedFee != null && user.status != null && user.start != null && user.end != null && user.pocketName != null && user.profile != null) {
        // Guardar el usuario
        user.save((err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el usuario' });
            } else {
                if (!userStored) {
                    res.status(400).send({ message: 'No se ha registrado el usuario' });
                } else {
                    res.status(200).send({ user: userStored });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'Ingrese los siguientes campos: Nombre, Cuota pactada, Estado, Fecha inicio, Fecha fin, Nombre bolsillo, Perfil' });
    }
}

function login(req, res) {
    var params = req.body;

    var pocketName = params.pocketName;
    var password = params.password;

    console.log(params);

    User.findOne({ pocketName: pocketName }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error al consultar el usuario' });
        } else {
            if (!user) {
                res.status(400).send({ message: 'El usuario no existe' });
            } else {
                // Comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        // Devolver los datos del usuario logueado
                        if (params.gethash) {
                            // Devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(400).send({ message: 'El usuario no ha podido iniciar sesión' });
                    }
                })
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if (update.password) {
        // Encriptar contraseña
        bcrypt.hash(update.password, null, null, function (err, hash) {
            update.password = hash;
        });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    })
}

module.exports = {
    listUsers,
    saveUser,
    login,
    updateUser
};
'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/register', md_auth.ensureAuth, UserController.saveUser);
api.post('/login', UserController.login);
api.get('/list', md_auth.ensureAuth, UserController.listUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;
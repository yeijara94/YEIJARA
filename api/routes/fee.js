'use strict'

var express = require('express');
var FeeController = require('../controllers/fee');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/fees' });

api.get('/dues', md_auth.ensureAuth, FeeController.listDues);
api.get('/fee/:id', md_auth.ensureAuth, FeeController.getFee);
api.get('/fees/:page?', md_auth.ensureAuth, FeeController.getFees);
api.post('/fee', md_auth.ensureAuth, FeeController.saveFee);
api.put('/fee/:id', md_auth.ensureAuth, FeeController.updateFee);
api.get('/dues/:user', md_auth.ensureAuth, FeeController.getDuesUser);
api.post('/upload-image-fee/:id', [md_auth.ensureAuth, md_upload], FeeController.uploadImage);
api.get('/get-image-fee/:imageFile', FeeController.getImageFile);
api.delete('/fee/:id', md_auth.ensureAuth, FeeController.deleteFee);

module.exports = api;
'use strict'

var express = require('express');
var PenaltyController = require('../controllers/penalty');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/penalty', md_auth.ensureAuth, PenaltyController.savePenalty);

module.exports = api;
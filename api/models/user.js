'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    agreedFee: Number,
    status: String,
    start: Date,
    end: Date,
    account: String,
    pocketName: String,
    password: String,
    profile: String
});

module.exports = mongoose.model('User', UserSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestSchema = Schema({
    date: Date,
    value: Number
});

module.exports = mongoose.model('Interest', InterestSchema);
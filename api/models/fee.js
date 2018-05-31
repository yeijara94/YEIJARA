'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeeSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    date: Date,
    value: Number,
    status: String,
    image: String
});

module.exports = mongoose.model('Fee', FeeSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PenaltySchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    fee: { type: Schema.ObjectId, ref: 'Fee' },
    date: Date,
    value: Number,
    concept: String
});

module.exports = mongoose.model('Penalty', PenaltySchema);
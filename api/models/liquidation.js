'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiquidationSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    date: Date,
    valueSaved: Number,
    interest: Number,
    totalValue: Number
});

module.exports = mongoose.model('Liquidation', LiquidationSchema);
'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var fee_routes = require('./routes/fee');
var penalty_routes = require('./routes/penalty');
var loan_routes = require('./routes/loan');
var loanPayment_routes = require('./routes/loanPayment');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Rutas base
app.use('/api', user_routes);
app.use('/api', fee_routes);
app.use('/api', penalty_routes);
app.use('/api', loan_routes);
app.use('/api', loanPayment_routes);

module.exports = app;
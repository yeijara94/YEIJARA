'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8180;

mongoose.connect('mongodb://localhost:27017/nequi', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La conexión a la base de datos está funcionando correctamente...");

        app.listen(port, function () {
            console.log("Servidor del api rest de nequi escuchando en http://localhost:" + port);
        })
    }
})
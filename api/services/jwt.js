'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'nequi';

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        agreedFee: user.agreedFee,
        status: user.status,
        start: user.start,
        end: user.end,
        account: user.account,
        pocketName: user.pocketName,
        password: user.password,
        profile: user.profile,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};
const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

exports.connect = (url = MONGO_URI, opts = {}) => {
    return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

'use strict';

var mongoose = require('mongoose');

var BloqSchema = new mongoose.Schema({
    type: String,
    name: 'String',
    connectors: Array,
    bloqClass: String,
    content: Array,
    code: String,
    _createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bloq', BloqSchema);
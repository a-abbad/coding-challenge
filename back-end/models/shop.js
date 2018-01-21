'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    picture: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    location: {
        index: '2dsphere',
        type: [Number],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Shop', schema);

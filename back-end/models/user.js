'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedShops : [{
        shop : {
            type : Schema.Types.ObjectId,
            ref: 'Shop'
        },
        dateTime : {
            type: Date,
            required: true
        }
    }],
    dislikedShops : [{
        shop : {
            type : Schema.Types.ObjectId,
            ref: 'Shop'
        },
        dateTime : {
            type: Date,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', schema);
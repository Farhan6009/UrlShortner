const express = require("express")
const mongoose = require('mongoose')
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        unique: true

    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

})

const ShortUrl = new mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    dateVisit: {
        type: Date
    },
    markerCA: {
        type: Number
    },
    symptoms: {
        type: String
    },
    comment: {
        type: String
    },
    mrtFile: {
        type: String,
    },
    ctFile: {
        type: String,
    },
    healthScore: {
        type: Number
    },
    resultForm: {
        type: Number,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
})

module.exports = mongoose.model('card', cardSchema)
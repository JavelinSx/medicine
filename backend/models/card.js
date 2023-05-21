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
    comments: {
        type: String
    },
    fileMRT: {
        type: String,
    },
    fileKT: {
        type: String,
    },
    healthScore: {
        type: Number
    },
    resultForm: {
        type: Array,
    },
    status: {
        type: String,
        enum: ['new', 'updated', 'confirmed']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
})

module.exports = mongoose.model('card', cardSchema)
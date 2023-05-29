const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    dateVisit: {
        type: Date,
        default: new Date()
    },
    markerCA: {
        type: Number,
        default: 0,
    },
    symptoms: {
        type: String,
        default: '',
    },
    comments: {
        type: String,
        default: '',
    },
    fileMRT: {
        type: String,
        default: ''
    },
    fileKT: {
        type: String,
        default: ''
    },
    healthScore: {
        type: Number,
        default: 0,
    },
    resultForm: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        enum: ['new', 'updated', 'confirmed'],
        default: 'new'
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
})

module.exports = mongoose.model('card', cardSchema)
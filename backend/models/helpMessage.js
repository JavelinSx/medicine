const mongoose = require('mongoose');
const HelpMessageSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    comments: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('helpMessage', HelpMessageSchema)
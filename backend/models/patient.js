const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const patientSchema = new mongoose.Schema({
    surName: {
        type: String,
    },
    name: {
        type: String,
    },
    middleName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Муж.', 'Жен.']
    },
    birthDay: {
        type: Date,
    },
    role: {
        type: String,
        default: 'patient'
    },
    login:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false,
    }
})

patientSchema.statics.findUserByCredentials = function findPatient(login, password){
    return this.findOne({login}).select('+password')
    .then((patient) => bcrypt
        .compare(password, patient.password)
        .then((matched) => {
            if(!matched){
                return Promise.reject(new Error('Ошибка авторизации'))
            }
            return patient;
        })
    )
}

module.exports = mongoose.model('patient', patientSchema)
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
        enum: ['male', 'female']
    },
    birthDay: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'patient'
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})

patientSchema.statics.findUserByCredentials = function findPatient(login, password) {
    return this.findOne({ login }).select('+password')
        .then((patient) =>
            bcrypt
                .compare(password, patient.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Ошибка авторизации'))
                    }
                    return patient;
                })
        )
}

patientSchema.statics.changePassword = function (patientId, oldPassword, newPassword) {
    return this.findById(patientId).select('+password')
        .then((patient) =>
            bcrypt.compare(oldPassword, patient.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Старый пароль неверный'));
                    }
                    patient.password = newPassword;
                    return patient.save();
                })
        );
};

patientSchema.statics.patientCheck = function (surName, name, middleName) {
    return this.findOne({
        surName: surName,
        name: name,
        middleName: middleName
    })
        .then((data) => {
            if (data) {
                return true
            }
            return Promise.reject(new Error('Пациент не найден'));
        })
}

module.exports = mongoose.model('patient', patientSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const registrarSchema = new mongoose.Schema({
    surName: {
        type: String,
    },
    name: {
        type: String,
    },
    middleName: {
        type: String,
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
    },
    role:{
        type: String,
        default: 'registrar'
    }
})


registrarSchema.statics.findUserByCredentials = function findUser(login, password){
    return this.findOne({login}).select('+password')
    .then((user) => bcrypt
        .compare(password, user.password)
        .then((matched) => {
            if(!matched){
                return Promise.reject(new Error('Ошибка авторизации'))
            }
            return user;
        })
    )
}

module.exports = mongoose.model('registrar', registrarSchema)
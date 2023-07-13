const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:String,
    password:String
})

const SignupModel = mongoose.model('SignupModel', userSchema);

module.exports = {SignupModel};
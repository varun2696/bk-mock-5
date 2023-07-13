const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:String,
});

const EmployeeModel = mongoose.model('employee',employeeSchema);

module.exports = EmployeeModel;
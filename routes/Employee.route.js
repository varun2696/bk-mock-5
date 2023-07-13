const express = require("express");
const EmployeeModel = require("../models/Employee.model");

const employeeRouter = express.Router();

employeeRouter.post("/employees", async (req, res) => {
  try {
    const newEmployee = new EmployeeModel(req.body);
    await newEmployee.save();
    res.status(200).send({ msg: "Added new employee" });
  } 
  catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = employeeRouter;

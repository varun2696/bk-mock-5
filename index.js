const express = require('express');
const cors = require('cors');
const { connection } = require('mongoose');
const userRouter = require('./routes/User.route');
const employeeRouter = require('./routes/Employee.route');
const {PORT} = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(userRouter);
app.use(employeeRouter);

app.listen(PORT, async() => {
    try {
        await connection;
        console.log('Connected to database');
    } catch (error) {
        console.log("Error connecting");
    }
  console.log('app listening on port 6000!');
});
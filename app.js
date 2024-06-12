// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user'); // Assuming you've created the user model

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://djarsolutions:solutiondjar@cluster0.5p7igr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

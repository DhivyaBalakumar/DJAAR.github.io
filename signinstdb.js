// signinstdb.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models2/startup');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
//mongodb://localhost/startup
mongoose.connect('mongodb+srv://djarsolutions:solutiondjar@cluster0.5p7igr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'No user with that email' });
  }

  if (user.password !== password) { // in a real app, make sure to hash and salt passwords!
    return res.status(400).json({ message: 'Incorrect password' });
  }

  res.json({ message: 'Logged in!' });
});

app.listen(3004, () => console.log('Server started on port 3004'));

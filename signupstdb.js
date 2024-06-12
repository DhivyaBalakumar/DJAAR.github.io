
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models2/startup');
const cors = require('cors');

const app = express();
const uri = "mongodb+srv://djarsolutions:solutiondjar@cluster0.5p7igr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors());
app.use(bodyParser.json());
// mongodb://localhost/startup
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/signup', async (req, res) => {
  const { name, email, password, phone} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User with that email already exists' });
  }

  const user = new User({ name, email, password, phone }); // in a real app, make sure to hash and salt passwords!

  await user.save();

  res.json({ message: 'Account created!' });
});

app.listen(3005, () => console.log('Server started on port 3005'));

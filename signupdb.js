// signupdb.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
//mongodb://localhost/investors
mongoose.connect('mongodb+srv://djarsolutions:solutiondjar@cluster0.5p7igr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User with that email already exists' });
  }

  const user = new User({ name, email, password, phone }); // in a real app, make sure to hash and salt passwords!

  await user.save();

  res.json({ message: 'Account created!' });
});

app.listen(3002, () => console.log('Server started on port 3002'));
/*const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const User = require('./models/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://DJARSOLUTIONS:SOLUTIONDJAR@djar-solutions.2vznu9i.mongodb.net/?retryWrites=true&w=majority&appName=DJAR-SOLUTIONS', { useNewUrlParser: true, useUnifiedTopology: true });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User with that email already exists' });
  }

  const otp = speakeasy.totp({
    secret: 'your-secret-key',
    encoding: 'base32',
  });

  const user = new User({
    name,
    email,
    password, // Hash and salt the password in a real application
    phone,
    otp,
    otpExpires: Date.now() + 300000 // OTP expires in 5 minutes
  });

  await user.save();

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Account created! Check your email for the OTP to verify your account.' });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password }); // In a real app, verify hashed password

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const otp = speakeasy.totp({
    secret: 'your-secret-key',
    encoding: 'base32',
  });

  user.otp = otp;
  user.otpExpires = Date.now() + 300000; // OTP expires in 5 minutes
  await user.save();

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'OTP sent to your email' });
  });
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: 'Login successful' });
});

app.listen(3002, () => {
  console.log('Signup server started on port 3002');
});
 */
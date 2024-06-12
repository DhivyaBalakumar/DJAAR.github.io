const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3006;

// Replace with your MongoDB connection URI
// const uri = "mongodb://localhost:27017/form-database";
const uri = "mongodb+srv://djarsolutions:solutiondjar@cluster0.5p7igr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const Startup = require('./formmodel/model'); // Import the Startup model

const upload = multer(); // Configure Multer without destination for direct storage

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-info', upload.single('startupImage'), async (req, res) => {
  const {
    startupName,
    startupDomain,
    ownerName,
    ownerEmail,
    ownerPhone,
    startupDetails,
    fundingGoal,
    pitchVideo,
    prototypeLink,
  } = req.body;

  const imageData = req.file ? req.file.buffer : null; // Get image data from file buffer

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const newStartup = new Startup({
      startupName,
      startupDomain,
      ownerName,
      ownerEmail,
      ownerPhone,
      startupDetails,
      imageData,
      fundingGoal: parseFloat(fundingGoal) || null, // Convert fundingGoal to number (optional)
      pitchVideo,
      prototypeLink,
    });

    await newStartup.save();

    res.send('Startup information submitted successfully!');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting information. Please try again later.');
  } finally {
    await mongoose.disconnect();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

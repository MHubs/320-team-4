/* **
This server.js is based off of the tutorial at https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
** */
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const JobPosting = require('../models/JobPostingJSON');

const app = express();
const router = express.Router();

const dbRoute = "mongodb://3.18.251.248:27017/scrumgang_server";
const API_PORT = 3001;

app.use(cors()); //makes app work with cors
app.use(bodyParser()); //parses json data for us

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", function(){ console.log("connected")});

// this is our create methid
// this method adds new data in our database
app.post("/putData", function(req, res) {
  job = new JobPosting(); //based on Mongoose schema
  //TODO: Fill in the rest of the fields here before saving object
  job.title = req.body.jobTitle;
  job.description = req.body.jobDescription;
  job.managerID = req.body.managerID;
  job.postedDate = req.body.postingDate;

  job.save(function(err) { //sends object to database
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.get("/getData",function(req, res) {
  console.log("getting data");
  JobPosting.find(function(err, data) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })});


app.listen(API_PORT, function(){ console.log(`LISTENING ON PORT ${API_PORT}`)});

/* **
This server.js is based off of the tutorial at https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
** */
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const JobPosting = require('../models/JobPostingJSON');
var mongodb = require('mongodb');
const JobApplication = require('../models/JobApplicationJSON');
const Employee = require('../models/EmployeeJSON');

const app = express()
const router = express.Router()

const dbRoute = "mongodb://18.221.111.127:27017/scrumgang_server"
const API_PORT = 3001

app.use(cors()); //makes app work with cors
app.use(bodyParser()); //parses json data for us

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
let db = mongoose.connection

db.once("open", () => console.log("connected"));

// this is our create methid
// this method adds new data in our database
app.post("/putData", (req, res) => {
  job = new JobPosting(); //based on Mongoose schema

  job.title = req.body.jobTitle;
  job.description = req.body.jobDescription;
  job.managerId = req.body.managerID;
  job.postedDate = req.body.postingDate;
  job.companyId = req.body.companyID;
  job.companyName = req.body.companyName;
  job.customFields = req.body.customFieldValues;
  job.startDate = req.body.startDate;
  job.postingExpirationDate = req.body.expirationDate;

  job.save(err => { //sends object to database
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//Update Job Posting
app.post("/updateData", (req, res) => {
  console.log(req.body);

  JobPosting.updateOne({"_id": new mongodb.ObjectId(req.body.job._id)},
  {$set:{"title": req.body.jobTitle, "description":req.body.jobDescription, "startDate":req.body.startDate, "postingExpirationDate":req.body.expirationDate, "customFields":req.body.customFieldValues}}, (err, result) => {
    if (err) return console.log(err);
    console.log(req.body);
    return res.json({success: true});
  })
});

//Update Employee
app.post("/updateEmployee", (req, res) => {
  console.log(req.body);
  var compID = req.body.companyID;
  var empID = req.body.employeeID;
  var customFields = req.body.customFields;
  var onBoard = req.body.onBoarding;

  Employee.updateOne({"companyId": compID,  "employeeId":empID},
      {$set:{"title": req.body.jobTitle, "description":req.body.jobDescription, "startDate":req.body.startDate, "postingExpirationDate":req.body.expirationDate, "customFields":customFields,"onBoarding":onBoard}}, (err, result) => {
        if (err) return console.log(err);
        console.log(req.body);
        return res.json({success: true});
      })
});

app.post("/putApp", (req, res) => {
  application = new JobApplication(); //based on Mongoose schema

  application.firstName = req.body.fname;

  application.lastName = req.body.lname;
  application.email = req.body.email;

  application.jobID = req.body.jobID;
  application.resume = req.body.resume;
  application.resume_name = req.body.resume_name;
  application.resume_type = req.body.resume_type;
  console.log(req.body.resume)
  console.log(req.body.resume.name)
  console.log(req.body.resume.type)
  console.log(application.resume)

  application.save(err => { //sends object to database
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.get("/getApps",(req, res) => {
  JobApplication.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })});

app.get("/getData",(req, res) => {
  JobPosting.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  })});

app.post("/addEmployee", (req, res) => {
  employee = new Employee();

  employee.firstName = req.body.firstName;
  employee.lastName = req.body.lastName;
  employee.companyName = req.body.companyName;

  Employee.countDocuments({companyName:req.body.companyName}, function(err, count) {
    employee.employeeId = count + 1;
    employee.email = req.body.email;
    employee.companyId = req.body.companyId;

    employee.managerId = req.body.managerId;
    employee.positionTitle = req.body.positionTitle;
    employee.startDate = req.body.startDate;

    employee.onBoarding = req.body.onBoarding;
    employee.customFields = req.body.customFields;

    return employee.save(err => { //sends object to database
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: {id: employee.employeeId} });
    });
  });
 });

app.put("/getEmployee", (req, res) => {
  var compID = req.body.companyID;
  Employee.find({companyId: compID}, null, {sort: 'managerId'}, (err, data) => {
    if (err){
      console.log(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  })});

app.put("/getEmployeeByID", (req, res) => {
  var compID = req.body.companyID;
  var empID = req.body.employeeID;
  Employee.find({companyId: compID, employeeId: empID}, null, {sort: 'managerId'}, (err, data) => {
    if (err){
      console.log(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  })});

app.get("/orgChart/", (req, res) => {
  id = req.params.managerId
  if(!id){
    Employee.find({companyId: 1, managerId: {$exists: false}}, (err, data) => {
      if (err){
        console.log(err)
        return res.json({ success: false, error: err });
      }
      return res.json({ success: true, data: data });
    })}
  else{
    Employee.find({companyId: 1, managerId: id}, (err, data) => {
      if (err){
        console.log(err)
        return res.json({ success: false, error: err });
      }
      return res.json({ success: true, data: data });
    })}
  })

  //Called by EditJobPostingCard when delete button is pressed.
  //Deletes Job by using ID
    app.post("/deleteJobPosting", (req, res) => {
      JobPosting.deleteOne({_id: new mongodb.ObjectId( req.body.id)}, (err, result) => {
        if (err) return console.log(err)
        return res.json({success: true});
      })
    });

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

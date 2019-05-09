var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({ //defines database schema to store objects
  "firstName" : String,
  "lastName" : String,
  "email" : String,
  "resume" : Buffer,
  "resume_name": String,
  "resume_type": String,
  "jobID" : String
},{ collection: 'JobApplications' });

module.exports = mongoose.model('JobApplications', ApplicationSchema);

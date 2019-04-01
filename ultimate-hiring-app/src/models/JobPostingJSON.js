var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({ //defines database schema to store objects
  "title" : String,
  "description" : String,
  "companyId" : Number,
  "companyName" : String,
  "managerId" : Number,
  "startDate" : String,
  "postedDate" : Date,
  "postingExpirationDate" : Date
});

module.exports = mongoose.model('JobPosting', jobSchema, 'JobPosting');
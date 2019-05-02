var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({ //defines database schema to store objects
  "title" : String,
  "description" : String,
  "companyId" : Number,
  "companyName" : String,
  "managerId" : Number,
  "startDate" : String,
  "postedDate" : String,
  "postingExpirationDate" : String,
  "customFields": Array
},{ collection: 'JobPosting' });

module.exports = mongoose.model('JobPosting', jobSchema);

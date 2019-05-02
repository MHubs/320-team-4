var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({ //defines database schema to store objects
  "firstName" : String,
  "lastName" : String,
  "email" : String
},{ collection: 'JobApplications' });

module.exports = mongoose.model('JobApplications', ApplicationSchema);

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const usersSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  dob: {
    type: Date
  },
  role: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
      type: Date,
      default: Date.now
  }
}, { collection: 'users'});

module.exports = mongoose.model("Users", usersSchema);
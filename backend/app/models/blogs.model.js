var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const blogsSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  modify_date: {
    type: Date
  },
  status: {
    type: String
  },
  category: {
    type: String
  },
  author: {
      type:Schema.Types.ObjectId,
      ref:'Users',
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
      type: Date,
      default: Date.now
  }
}, { collection: 'blogs'});

module.exports = mongoose.model("Blogs", blogsSchema);
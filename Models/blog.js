const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  blogContent: {
    type: String,
    required: true
  },
  coverUrl: {
    type: String,
    default: "/uploads/WIN_20240323_17_15_45_Pro.jpg"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Make sure 'User' is the model name used for populating
  },
  numberOfLikes: {
    type: Number,
    default: 0
  },
  numberOfComments: {
    type: Number,
    default: 0
  },
  numberOfShares: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

// Ensure the model name matches exactly
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

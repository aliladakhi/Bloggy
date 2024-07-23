const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  LikedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  LikedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  }
}, {
  timestamps: true
});
likeSchema.index({ LikedBy: 1, LikedTo: 1 }, { unique: true });

const Like = mongoose.model("like", likeSchema);

module.exports = Like;

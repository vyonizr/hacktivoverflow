const mongoose = require("mongoose")
const { Schema } = mongoose

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Question title should not be empty"]
  },
  description: {
    type: String,
    required: [true, "Question description should not be empty"]
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "Answer"
  }],
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question
const mongoose = require("mongoose")
const { Schema } = mongoose

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question"
  },
  title: {
    type: String,
    required: [true, "Answer title should not be empty"]
  },
  description: {
    type: String,
    required: [true, "Answer description should not be empty"]
  },
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

const Answer = mongoose.model("Answer", answerSchema)

module.exports = Answer
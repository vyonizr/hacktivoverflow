const { Question } = require("../models")

module.exports = function isAuthorized(req, res, next) {
  Question.findById(req.params.questionId)
  .populate({
    path: "createdBy",
    select: "_id"
  })
  .then(foundQuestion => {
    if (foundQuestion === null) {
      res.status(404).json({
        errors: {
          message: "Question not found."
        }
      })
    }
    else if (foundQuestion.createdBy._id != req.authenticatedUser.id) {
      res.status(401).json({
        errors: {
          message: "You are not authorized to perform this action."
        }
      })
    }
    else {
      next()
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
}
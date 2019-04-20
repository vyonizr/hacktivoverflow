const { Answer } = require("../models")

module.exports = function isAuthorized(req, res, next) {
  Answer.findById(req.params.answerId)
  .populate({
    path: "createdBy",
    select: "_id"
  })
  .then(foudnAnswer => {
    if (foudnAnswer === null) {
      res.status(404).json({
        errors: {
          message: "Question not found."
        }
      })
    }
    else if (foudnAnswer.createdBy._id != req.authenticatedUser.id) {
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
    res.status(500).json(err)
  })
}
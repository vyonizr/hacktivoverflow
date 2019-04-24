const { Answer } = require("../models")

module.exports = function isAuthorized(req, res, next) {
  Answer.findById(req.params.answerId)
  .then(foundAnswer => {
    if (foundAnswer === null) {
      res.status(404).json({
        errors: {
          message: "Answer not found."
        }
      })
    }
    else if (foundAnswer.createdBy._id != req.authenticatedUser.id) {
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
const { Answer, Question, User } = require("../models")

class AnswerController {
  static getAllAnswers(req, res) {
    Answer.find({})
    .populate({
      path: "createdBy",
      select: "name"
    })
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getAnAnswer(req, res) {
    Answer.findById(req.params.answerId)
    .then(foundAnswer => {
      res.status(200).json(foundAnswer)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static createAnAnswer(req, res) {
    let answer = null
    Answer.create({
      questionId: req.body.questionId,
      title: req.body.title,
      description: req.body.description,
      createdBy: req.authenticatedUser.id
    })
    .then(createdAnswer => {
      answer = createdAnswer
      return Question.findByIdAndUpdate(req.body.questionId, {
        $push: {
          answers: createdAnswer._id
        }
      }, { new: true })
    })
    .then(updatedQuestion => {
      res.status(201).json(answer)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.title) {
          objError.title = err.errors.title.message
        }
        if (err.errors.description) {
          objError.description = err.errors.description.message
        }
        res.status(400).json({
          errors: objError
        })
      }
      else {
        console.log(err);
        res.status(500).json(err)
      }
    })
  }

  static updateAnAnswer(req, res) {
    Answer.findByIdAndUpdate(req.params.answerId, {
      title: req.body.title,
      description: req.body.description,
    }, { new: true })
    .then(updatedAnswer => {
      res.status(200).json(updatedAnswer)
    })
    .catch(err => {
      if (err.errors) {
        let objError = {}
        if (err.errors.title) {
          objError.title = err.errors.title.message
        }
        if (err.errors.description) {
          objError.description = err.errors.description.message
        }
        res.status(400).json({
          errors: objError
        })
      }
      else {
        console.log(err);
        res.status(500).json(err)
      }
    })
  }

  static upvoteAnAnswer(req, res) {
    Answer.findByIdAndUpdate(req.params.answerId, {
      $pull: {
        downvotes: req.authenticatedUser.id
      },
      $addToSet: {
        upvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedAnswer => {
      res.status(200).json(updatedAnswer)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static removeUpvoteAnAnswer(req, res) {
    Answer.findByIdAndUpdate(req.params.answerId, {
      $pull: {
        upvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedAnswer => {
      res.status(200).json(updatedAnswer)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static downvoteAnAnswer(req, res) {
    Answer.findByIdAndUpdate(req.params.answerId, {
      $pull: {
        upvotes: req.authenticatedUser.id
      },
      $addToSet: {
        downvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedAnswer => {
      res.status(200).json(updatedAnswer)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static removeDownvoteAnAnswer(req, res) {
    Answer.findByIdAndUpdate(req.params.answerId, {
      $pull: {
        downvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedAnswer => {
      res.status(200).json(updatedAnswer)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

}

module.exports = AnswerController

/*
User.update({},
{$pull : { "carts" : {"_id": req.params.productId} } } )
https://stackoverflow.com/questions/22065314/remove-a-subdocument-nested-in-an-array-in-mongodb
*/
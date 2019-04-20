const { Question, User, Answer } = require("../models")
const ObjectId = require('mongodb').ObjectID

class QuestionController {
  static getAllQuestions(req, res) {
    Question.find({})
    .populate({
      path: "createdBy",
      select: "name"
    })
    .populate({
      path: "answers",
      select: "title description createdBy createdAt"
    })
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static getAQuestion(req, res) {
    Question.findById(req.params.questionId)
    .populate({
      path: "createdBy",
      select: "name"
    })
    .populate({
      path: "answers",
      select: "title description createdBy createdAt",
      populate: {
        path: "createdBy",
        select: "name"
      }
    })
    .then(foundQuestion => {
      res.status(200).json(foundQuestion)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static createAQuestion(req, res) {
    Question.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.authenticatedUser.id
    })
    .then(createdQuestion => {
      res.status(201).json(createdQuestion)
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
        res.status(500).json(err)
      }
    })
  }

  static deleteAQuestion(req, res) {
    User.update({}, {
      $pull: {
        questions: {
          _id: req.params.questionId
        }
      }
    })
    .then(() => {
      return Question.deleteOne({
        _id: req.params.questionId
      })
    })
    .then(() => {
      return Answer.deleteMany({
        questionId: ObjectId(`${req.params.questionId}`)
      })
    })
    .then(() => {
      res.status(200).json({
        message: "delete success"
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static updateAQuestion(req, res) {
    console.log(req.params.questionId);
    Question.findByIdAndUpdate(req.params.questionId, {
      title: req.body.title,
      description: req.body.description,
    }, { new: true })
    .then(updatedQuestion => {
      res.status(201).json(updatedQuestion)
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

  static upvoteAQuestion(req, res) {
    Question.findByIdAndUpdate(req.params.questionId, {
      $pull: {
        downvotes: req.authenticatedUser.id
      },
      $addToSet: {
        upvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedQuestion => {
      res.status(200).json(updatedQuestion)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static removeUpvoteAQuestion(req, res) {
    Question.findByIdAndUpdate(req.params.questionId, {
      $pull: {
        upvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedQuestion => {
      res.status(200).json(updatedQuestion)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static downvoteAQuestion(req, res) {
    Question.findByIdAndUpdate(req.params.questionId, {
      $pull: {
        upvotes: req.authenticatedUser.id
      },
      $addToSet: {
        downvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedQuestion => {
      res.status(200).json(updatedQuestion)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static removeDownvoteAQuestion(req, res) {
    Question.findByIdAndUpdate(req.params.questionId, {
      $pull: {
        downvotes: req.authenticatedUser.id
      }
    }, { new: true })
    .then(updatedQuestion => {
      res.status(200).json(updatedQuestion)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }
}

module.exports = QuestionController

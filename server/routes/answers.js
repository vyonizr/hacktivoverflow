const router = require("express").Router()
const AnswerController = require("../controllers/answerController")
const { isAuthenticated, isAuthorizedAnswer } =require("../middlewares")

router.get("/", AnswerController.getAllAnswers)
router.get("/:answerId", AnswerController.getAnAnswer)

router.use(isAuthenticated)
router.post("/", AnswerController.createAnAnswer)

// router.use(isAuthorizedAnswer)
router.patch("/:answerId", isAuthorizedAnswer, AnswerController.updateAnAnswer)

router.post("/:answerId/upvote", AnswerController.upvoteAnAnswer)
router.delete("/:answerId/upvote", AnswerController.removeUpvoteAnAnswer)

router.post("/:answerId/downvote", AnswerController.downvoteAnAnswer)
router.delete("/:answerId/downvote", AnswerController.removeDownvoteAnAnswer)


/*
/answers/ GET
/answers/ POST
/answers/:answerId PATCH

/answers/:answerId/upvote POST
/answers/:answerId/upvote DELETE

/answers/:answerId/downvote POST
/answers/:answerId/downvote DELETE
*/

module.exports = router
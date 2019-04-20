const router = require("express").Router()
const QuestionController = require("../controllers/questionController")
const { isAuthenticated, isAuthorizedQuestion } =require("../middlewares")

router.get("/", QuestionController.getAllQuestions)
router.use(isAuthenticated)
router.get("/:questionId", QuestionController.getAQuestion)
router.post("/", QuestionController.createAQuestion)

// router.use(isAuthorizedQuestion)
router.patch("/:questionId",isAuthorizedQuestion, QuestionController.updateAQuestion)
router.delete("/:questionId", isAuthorizedQuestion, QuestionController.deleteAQuestion)

router.post("/:questionId/upvote", QuestionController.upvoteAQuestion)
router.delete("/:questionId/upvote", QuestionController.removeUpvoteAQuestion)

router.post("/:questionId/downvote", QuestionController.downvoteAQuestion)
router.delete("/:questionId/downvote", QuestionController.removeDownvoteAQuestion)

/*
/routes/ GET
/routes/ POST
/routes/:questionId PATCH
/routes/:questionId DELETE

/routes/:questionId/upvote POST
/routes/:questionId/upvote DELETE

/routes/:questionId/downvote POST
/routes/:questionId/downvote DELETE
*/

module.exports = router
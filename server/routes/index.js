const router = require("express").Router()
const questions = require("./questions")
const users = require("./users")
const answers = require("./answers")

router.use("/answers", answers)
router.use("/questions", questions)
router.use("/users", users)

module.exports = router
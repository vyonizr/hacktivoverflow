const cron = require('node-cron')
const kue = require('kue')
const sendMail = require('./nodemailer')
const { User } = require('../models')
const queue = kue.createQueue()

kue.app.listen(4000)

module.exports = function sendEmail() {
  cron.schedule('0 0 * * *', () => {
    console.log('cron is starting');

    User.find({})
    .populate('questions')
    .then(users => {

      users.forEach(user => {
        let emailTemplate = ""
        let questionsStats = ""

        user.questions.forEach(question => {
          let stats =`
          Title: ${question.title}
          Answers: ${question.answers.length}
          Votes: ${question.upvotes.length - question.upvotes.length}
          ---------------------`

          questionsStats += stats
          console.log(stats);
        })

        emailTemplate += `
        Greetings, ${user.email.split('@')[0]}

        Here is your questions stats:
        ${questionsStats}

        - HacktivOverflow Team`

        queue.create('email', {
          email: user.email,
          template: emailTemplate
        })
        .save()
      })
    })
    .catch(err => {
      console.log(err);
    })

    queue.process('email', function (job, done) {
      sendMail(job.data.email, job.data.template)
      done()
    })
  })
}

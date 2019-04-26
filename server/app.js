require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 80
const routes = require("./routes")
const schedule = require("./helpers/cronJob")

schedule()

mongoose.set('useFindAndModify', false);

// mongoose.connect("mongodb://localhost:27017/hacktivoverflow", { useNewUrlParser: true })
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@divenire-1se8t.gcp.mongodb.net/hacktivoverflow`, { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

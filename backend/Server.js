const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/appRoutes')


require ('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(PORT, () => console.log(`Listening on :${PORT}`))

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected to MongoDB!`))
    .catch((err) => console.log(err))
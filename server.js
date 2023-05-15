const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended : true }))
app.use(express.json())

mongoose.Promise = global.Promise;

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())

app.use(`/api/v1/` ,require('./Route/authRoute'))
app.use(`/api/v1/Agency/` ,require('./Route/AgencyClient'))

app.all('*', (req,res) => {
    res.status(404).json({ msg : `requested path not found , try '/api/v1/' `})
})

app.listen(PORT , async() => {
    await connectDb(process.env.MONGO_URI)
    console.log(`server is started @ http://localhost:${PORT}`)
})
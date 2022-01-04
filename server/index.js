const express = require('express')
const path = require('path')
const sequelize = require('./utils/db')

const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)


// Обработка ошибок, последний Middleware
app.use(errorHandler)


async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start()
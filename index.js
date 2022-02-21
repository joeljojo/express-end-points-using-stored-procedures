const express = require('express')
const app = express()
const config = require('./Config/db')
const userRoutes = require('./Routes/userRoutes')
const port = 7500

app.use(express.json())

app.use(userRoutes)

app.listen(port, () => {
    console.log('App listening to port ' + port)
})
const express = require('express')
const mssql = require('mssql')
const dotenv = require('dotenv').config()
const db = express()


const config = {
    user: process.env.DB_USER,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    options: {
        trustServerCertificate: true
    }
}

mssql.connect(config, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connecting to database ....')
    }

})

module.exports = db;
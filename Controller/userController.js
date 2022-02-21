const { config } = require('dotenv')
const express = require('express')
const mssq = require('mssql')
const crypto = require('crypto')
const router = express()

// Add users
async function addUser(req, res) {
    try {
        const { email, password } = req.body

        //Ecrypt
        const cipher = crypto.createHash("sha256").update(password).digest("base64");
        const pool = await mssq.connect(config)
        await pool.request()
            .input('email', mssq.VarChar(50), email)
            .input('password', mssq.VarChar(50), cipher)
            .execute('AddUser')
            //  await pool.request().query(`exec AddUser @email = '${email}', @password ="${cipher}"`)
        res.send('User added successfully!')



    } catch (err) {
        console.log(err)
    }
}

// get all users 
async function displayUsers(req, res) {
    try {
        const pool = await mssq.connect(config)
        const result = await pool.request()
            .execute('AllUSers')
        res.json(result.recordset)

    } catch (err) {
        console.log(err)
    }
}

//get specific users

async function displaySpecificUser(req, res) {
    try {
        const pool = await mssq.connect(config)
        const id = req.params.id
        const result = await pool.request()
            .input('id', mssq.Int, id)
            .execute('SpecificUser')
            // const result = await pool.request().query(`EXEC SpecificUser @id=${id}`)
        res.json(result.recordset)


    } catch (err) {
        console.log(err)
    }
}

// Delete  specific user 
async function deleteSpecificUser(req, res) {
    try {
        const id = req.params.id
        const pool = await mssq.connect(config)
        await pool.request()
            .input('id', mssq.Int, id)
            .execute('DeleteUser')
            //await pool.request().query(`EXEC DeleteUser @id = ${id}`)
        res.send('USer Deleted Successfully')

    } catch (err) {
        console.log(err)
    }
}

//Update user
async function updateUser(req, res) {
    try {
        const { email, password } = req.body
        const id = req.params.id
        const cipher = crypto.createHash("sha256").update(password).digest("base64");
        const pool = await mssq.connect(config)
        await pool.request()
            .input('id', mssq.Int, id)
            .input('email', mssq.VarChar(50), email)
            .input('password', mssq.VarChar(50), cipher)
            .execute('UpdateUSer')
            // await pool.request().query(`EXEC UpdateUSer @id= ${id}, @email = '${email}', @password = '${password}'`)
        res.send('User updated Successfully')

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    displayUsers,
    displaySpecificUser,
    deleteSpecificUser,
    addUser,
    updateUser
}
const express = require('express')
const router = express.Router()
const userControllers = require('../Controller/userController')



router.get('/users', userControllers.displayUsers)
router.get('/user/:id', userControllers.displaySpecificUser)
router.delete('/user/:id', userControllers.deleteSpecificUser)
router.post('/user', userControllers.addUser)
router.put('/user/:id', userControllers.updateUser)



module.exports = router;
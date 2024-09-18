const express = require('express')
const usersController = require('../controllers/users.controller.js')

const router = express.Router()

// List of routes
router.get('/', usersController.index)
router.get('/list', usersController.displayUsers)
router.get('/:id', usersController.showUser)
router.post('/', usersController.createUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router

const { Router } = require('express')
const userRoutes = Router()

const UsersController = require('../controllers/userController')
const usersController = new UsersController()

userRoutes.post('/', usersController.create)
userRoutes.put('/:id', usersController.update)
userRoutes.delete('/:id', usersController.delete)

module.exports = userRoutes

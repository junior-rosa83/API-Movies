const { Router } = require('express')
const routes = Router()

const usersRoutes = require('./usersRoutes')
const notesRoutes = require('./notesRoutes')

routes.use('/users', usersRoutes)
routes.use('/notes', notesRoutes)

module.exports = routes
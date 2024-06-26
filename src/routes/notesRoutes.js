const { Router } = require('express')
const notesRoutes = Router()

const NotesController = require('../controllers/notesController')
const notesController = new NotesController()

notesRoutes.post('/:user_id', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.put('/:id', notesController.update)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes
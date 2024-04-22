const knex = require('../database/knex')

class NotesController {
  async create(require, response) {
    const { tittle, description, rating, tags } = require.body
    const { user_id } = require.params

    await knex('movie_notes').insert({
      tittle,
      description,
      rating,
      user_id
    })
    
    response.json()
  }

  async show(require, response) {
    const { id } = require.params

    const note = await knex('movie_notes').where({ user_id: id })

    response.json({
      note
    })
  }

  async update(require, response) {
    const { tittle, description, rating } = require.body
    const { id } = require.params
    const note = await knex('movie_notes').where({ id }).first()

    note.tittle = tittle ?? note.tittle
    note.description = description ?? note.description
    note.rating = rating ?? note.rating

    await knex('movie_notes').where({ id }).update({
      tittle,
      description,
      rating
    })
    
    return response.json()
  }

  async delete(require, response) {
    const { id } = require.params

    await knex('movie_notes').where({ id }).delete()

    return response.json()
  }
}

module.exports = NotesController
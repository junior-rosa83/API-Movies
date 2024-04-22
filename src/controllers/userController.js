const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body
    
    if(!name || !email || !password) {
      throw new AppError("Você deixou algum campo vazio.")
    }
    
    const user = await knex('users').select().where('email', email).first()

    if(user) {
      throw new AppError('Este e-mail já está em uso.')
    }
    const hashPassword = await hash(password, 5)

    await knex('users').insert(
      { name, 
        email,
        password: hashPassword 
      })
    
    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password} = request.body
    const { id } = request.params

    const user = await knex('users').select().where('id', id).first()

    if(!user) {
      throw new AppError('Este usúario não existe.')
    }
    
    const userWithUpdatedEmail = await knex('users').where('email', email).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.');
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    
    if(!old_password) {
      throw new AppError('Digite sua senha antiga')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("Você digitou errado sua senha antiga.")
      } else {
        user.password = await hash(password, 5)
      }
    }

    await knex('users').where("id", id).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    return response.json()
  }

  async delete(request, response) {
    const { id } = request.params
    
    const user = await knex('users').select('id').where('id', id).first()
    if(!user) {
      throw new AppError('Usúario não encontrado.')
    }

    await knex('users').select(id).delete()

    return response.json()
  }
}

module.exports = UsersController
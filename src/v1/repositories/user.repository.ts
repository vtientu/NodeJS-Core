import BaseRepository from '@core/BaseRepositories.js'
import { IUser, IUserCreate } from '@interfaces/user.interface.js'
import UserModel from '@models/user.model.js'
import { Schema } from 'mongoose'

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel)
  }

  findUserByEmail = (email: string) => {
    return this.findOne({
      email
    }).lean()
  }

  findUserById = (id: Schema.Types.ObjectId) => {
    return this.findById(id).lean()
  }

  createUser = (user: IUserCreate) => {
    return this.create(user)
  }
}

export default new UserRepository()

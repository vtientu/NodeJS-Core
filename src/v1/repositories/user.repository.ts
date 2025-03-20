import BaseRepository from '@core/BaseRepositories.js'
import { IUser, IUserCreate } from '@interfaces/User.js'
import UserModel from '@models/user.models.js'

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel)
  }

  getUserByEmail = (email: string) => {
    return this.findOne({
      email
    }).lean()
  }

  getUserById = (id: string) => {
    return this.findById(id).lean()
  }

  createUser = (user: IUserCreate) => {
    return this.create(user)
  }
}

export default new UserRepository()

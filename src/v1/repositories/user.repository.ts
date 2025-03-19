import { IUserCreate } from '@interfaces/User.js'
import { UserModel } from '@models/user.models.js'

class UserRepository {
  getUserByEmail = async (email: string) => {
    return await UserModel.findOne({
      email
    }).lean()
  }
  createUser = async (user: IUserCreate) => {
    return await UserModel.create(user)
  }
}

export default new UserRepository()

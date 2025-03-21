import UserRepository from '@repositories/user.repository.js'

class UserService {
  public static getUserByEmail = async (email: string) => {
    return await UserRepository.getUserByEmail(email)
  }
}

export default UserService

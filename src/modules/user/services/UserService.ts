import { inject, injectable } from 'inversify'

import { IUserService } from '../interfaces/IUserService'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUserRepository } from '../interfaces/IUserRepository'
import { TYPES } from '../../../types/const'
import { UserDTO } from '../dtos/UserDTO'

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository) private userRepository!: IUserRepository
  async createUser(createUser: CreateUserDTO) {
    const createUserData = {
      login: createUser.login,
      pass: createUser.pass,
    }

    const newUser = await this.userRepository.createUser(createUserData)

    if (!newUser) {
      new Error('User not created!')
      return
    }

    return new UserDTO(newUser)
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findUserById(userId)

    if (!user) {
      return
    }

    return new UserDTO(user)
  }
}

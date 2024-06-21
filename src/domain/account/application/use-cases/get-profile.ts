import { Either, left, right } from '@/core/either'

import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProfileUseCaseRequest {
  userId: string
}

type GetProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: GetProfileUseCaseRequest,
  ): Promise<GetProfileUseCaseResponse> {
    const { userId } = request

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user,
    })
  }
}

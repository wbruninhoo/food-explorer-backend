import authConfig from '@/config/auth'
import { Either, left, right } from '@/core/either'

import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.comparer(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const expiresAccessTokenInSeconds =
      Math.floor(Date.now() / 1000) +
      authConfig.accessTokenExpiresInMilliseconds / 1000

    const expiresRefreshTokenInSeconds =
      Math.floor(Date.now() / 1000) +
      authConfig.refreshTokenExpiresInMilliseconds / 1000

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
      exp: expiresAccessTokenInSeconds,
    })

    const refreshToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
      exp: expiresRefreshTokenInSeconds,
    })

    return right({
      accessToken,
      refreshToken,
    })
  }
}

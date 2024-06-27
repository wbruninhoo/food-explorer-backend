import { Request, Response } from 'express'
import { container } from 'tsyringe'

import authConfig from '@/config/auth'
import { InvalidTokenError } from '@/domain/account/application/use-cases/errors/invalid-token-error'
import { RefreshTokenUseCase } from '@/domain/account/application/use-cases/refresh-token'

import { BadRequestError } from '../../errors/bad-request-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'

export class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const cookies = req.headers.cookie

    if (!cookies) {
      throw new UnauthorizedError('Token missing')
    }

    const [, token] = cookies.split('refreshToken=')

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const result = await refreshTokenUseCase.execute({ token })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidTokenError:
          throw new UnauthorizedError(error.message)
        default:
          throw new BadRequestError()
      }
    }

    const { accessToken, refreshToken } = result.value

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: authConfig.refreshTokenExpiresInMilliseconds,
      })
      .json({
        access_token: accessToken,
      })
  }
}

import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResourceNotFoundError } from '@/domain/account/application/use-cases/errors/resource-not-found-error'
import { GetProfileUseCase } from '@/domain/account/application/use-cases/get-profile'

import { BadRequestError } from '../../errors/bad-request-error'
import { HttpUserPresenter } from '../../presenters/http-user-presenter'

export class ProfileController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id
    const getProfile = container.resolve(GetProfileUseCase)

    const result = await getProfile.execute({ userId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestError('User not found.')
        default:
          throw new BadRequestError()
      }
    }

    const { user } = result.value

    return res.status(200).json({
      user: HttpUserPresenter.toHTTP(user),
    })
  }
}

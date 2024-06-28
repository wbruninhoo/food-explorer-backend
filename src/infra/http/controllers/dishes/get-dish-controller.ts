import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/domain/dish/application/use-cases/errors/resource-not-found-error'
import { GetDishUseCase } from '@/domain/dish/application/use-cases/get-dish'

import { BadRequestError } from '../../errors/bad-request-error'
import { HttpDishDetailsPresenter } from '../../presenters/http-dish-details-presenter'

export class GetDishController {
  async handle(req: Request, res: Response) {
    const getDishParamsSchema = z.object({
      dishId: z.string().uuid(),
    })

    const { dishId } = getDishParamsSchema.parse(req.params)

    const getDish = container.resolve(GetDishUseCase)

    const result = await getDish.execute({ dishId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestError('Dish not found.')
        default:
          throw new BadRequestError()
      }
    }

    const { dish } = result.value

    return res.status(200).json({
      dish: HttpDishDetailsPresenter.toHTTP(dish),
    })
  }
}

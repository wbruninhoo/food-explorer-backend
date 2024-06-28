import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { FetchDishesUseCase } from '@/domain/dish/application/use-cases/fetch-dishes'

import { BadRequestError } from '../../errors/bad-request-error'
import { HttpDishDetailsPresenter } from '../../presenters/http-dish-details-presenter'

export class FetchDishesController {
  async handle(req: Request, res: Response) {
    const fetchDishesQueryParamsSchema = z.object({
      query: z.string().optional(),
    })

    const { query } = fetchDishesQueryParamsSchema.parse(req.query)

    const fetchDishes = container.resolve(FetchDishesUseCase)

    const result = await fetchDishes.execute({ query })

    if (result.isLeft()) {
      throw new BadRequestError()
    }

    const { dishes } = result.value

    return res.status(200).json({
      dishes: dishes.map(HttpDishDetailsPresenter.toHTTP),
    })
  }
}

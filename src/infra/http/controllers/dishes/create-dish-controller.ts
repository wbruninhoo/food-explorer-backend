import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { CreateDishUseCase } from '@/domain/dish/application/use-cases/create-dish'

import { BadRequestError } from '../../errors/bad-request-error'

export class CreateDishController {
  async handle(req: Request, res: Response) {
    const createDishBodySchema = z.object({
      categoryId: z.string().uuid(),
      imageId: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      price: z
        .number()
        .min(0)
        .transform((value) => Number(value.toFixed(2))),
      ingredients: z.string().array(),
    })

    const { categoryId, imageId, description, ingredients, name, price } =
      createDishBodySchema.parse(req.body)

    const priceInCents = price * 100

    const createDish = container.resolve(CreateDishUseCase)

    const result = await createDish.execute({
      categoryId,
      imageId,
      description,
      ingredients,
      name,
      priceInCents,
    })

    if (result.isLeft()) {
      throw new BadRequestError()
    }

    return res.status(201).send()
  }
}

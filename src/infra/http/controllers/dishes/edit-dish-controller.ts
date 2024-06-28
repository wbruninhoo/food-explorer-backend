import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { EditDishUseCase } from '@/domain/dish/application/use-cases/edit-dish'
import { ResourceNotFoundError } from '@/domain/dish/application/use-cases/errors/resource-not-found-error'

import { BadRequestError } from '../../errors/bad-request-error'

export class EditDishController {
  async handle(req: Request, res: Response) {
    const editDishParamsSchema = z.object({
      dishId: z.string().uuid(),
    })

    const { dishId } = editDishParamsSchema.parse(req.params)

    const editDishBodySchema = z.object({
      categoryId: z.string().uuid(),
      imageId: z.string().uuid(),
      ingredients: z.string().array(),
      name: z.string(),
      description: z.string(),
      price: z
        .number()
        .min(0)
        .transform((value) => Number(value.toFixed(2))),
    })

    const { categoryId, imageId, description, ingredients, name, price } =
      editDishBodySchema.parse(req.body)

    const priceInCents = price * 100

    const editDish = container.resolve(EditDishUseCase)

    const result = await editDish.execute({
      dishId,
      categoryId,
      imageId,
      description,
      ingredients,
      name,
      priceInCents,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestError(error.message)
        default:
          throw new BadRequestError()
      }
    }

    return res.status(204).send()
  }
}

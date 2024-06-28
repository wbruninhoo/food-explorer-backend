import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { DeleteDishUseCase } from '@/domain/dish/application/use-cases/delete-dish'

import { BadRequestError } from '../../errors/bad-request-error'

export class DeleteDishController {
  async handle(req: Request, res: Response) {
    const deleteDishParamsSchema = z.object({
      dishId: z.string().uuid(),
    })

    const { dishId } = deleteDishParamsSchema.parse(req.params)

    const deleteDish = container.resolve(DeleteDishUseCase)

    const result = await deleteDish.execute({
      dishId,
    })

    if (result.isLeft()) {
      throw new BadRequestError()
    }

    return res.status(204).send()
  }
}

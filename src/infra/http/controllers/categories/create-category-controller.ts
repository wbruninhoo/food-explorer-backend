import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { CreateCategoryUseCase } from '@/domain/dish/application/use-cases/create-category'

import { BadRequestError } from '../../errors/bad-request-error'
import { HttpCategoryPresenter } from '../../presenters/http-category-presenter'

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const createCategoryBodySchema = z.object({
      name: z.string().min(3),
    })

    const { name } = createCategoryBodySchema.parse(req.body)

    const createCategory = container.resolve(CreateCategoryUseCase)

    const result = await createCategory.execute({ name })

    if (result.isLeft()) {
      throw new BadRequestError()
    }

    const { category } = result.value

    return res.status(201).json({
      category: HttpCategoryPresenter.toHTTP(category),
    })
  }
}

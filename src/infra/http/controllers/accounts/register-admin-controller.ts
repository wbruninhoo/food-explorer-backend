import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/domain/account/application/use-cases/errors/user-already-exists-error'
import { RegisterAdminUseCase } from '@/domain/account/application/use-cases/register-admin'

import { BadRequestError } from '../../errors/bad-request-error'
import { ConflictError } from '../../errors/conflict-error'

export class RegisterAdminController {
  async handle(req: Request, res: Response) {
    const registerAdminBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = registerAdminBodySchema.parse(req.body)

    const registerAdmin = container.resolve(RegisterAdminUseCase)

    const result = await registerAdmin.execute({
      email,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictError(error.message)
        default:
          throw new BadRequestError()
      }
    }

    return res.status(201).send()
  }
}

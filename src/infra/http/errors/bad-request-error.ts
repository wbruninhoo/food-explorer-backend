import { HttpStatus } from '@/core/enums/http-status.enum'

import { HttpError } from './http-error'

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

import { HttpStatus } from '@/core/enums/http-status.enum'

import { HttpError } from './http-error'

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}

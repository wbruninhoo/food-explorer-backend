import { HttpStatus } from '@/core/enums/http-status.enum'

import { HttpError } from './http-error'

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT)
  }
}

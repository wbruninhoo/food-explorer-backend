import { inject, injectable } from 'tsyringe'

import { Either, left, right } from '@/core/either'

import { Uploader } from '../storage/uploader'
import { InvalidImageTypeError } from './errors/invalid-image-type-error'

interface UploadDishImageUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadDishImageUseCaseResponse = Either<
  InvalidImageTypeError,
  {
    imageUrl: string
  }
>

@injectable()
export class UploadDishImageUseCase {
  constructor(
    @inject('Uploader')
    private uploader: Uploader,
  ) {}

  async execute(
    request: UploadDishImageUseCaseRequest,
  ): Promise<UploadDishImageUseCaseResponse> {
    const { fileName, fileType, body } = request

    const isValidFileType = /^image\/(?:jpeg|png|webp)$/.test(fileType)

    if (!isValidFileType) {
      return left(new InvalidImageTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    return right({
      imageUrl: url,
    })
  }
}

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DishImage } from '../../enterprise/entities/dish-image'
import { DishImagesRepository } from '../repositories/dish-images-repository'
import { Uploader } from '../storage/uploader'
import { InvalidImageTypeError } from './errors/invalid-image-type-error'

interface UploadDishImageUseCaseRequest {
  dishId: string
  fileName: string
  fileType: string
  body: Buffer
}

type UploadDishImageUseCaseResponse = Either<
  InvalidImageTypeError,
  {
    dishImage: DishImage
  }
>

export class UploadDishImageUseCase {
  constructor(
    private dishImagesRepository: DishImagesRepository,
    private uploader: Uploader,
  ) {}

  async execute(
    request: UploadDishImageUseCaseRequest,
  ): Promise<UploadDishImageUseCaseResponse> {
    const { fileName, fileType, body, dishId } = request

    const isValidFileType = /^image\/(?:jpeg|png|webp)$/.test(fileType)

    if (!isValidFileType) {
      return left(new InvalidImageTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const dishImage = DishImage.create({
      title: fileName,
      url,
      dishId: new UniqueEntityID(dishId),
    })

    await this.dishImagesRepository.create(dishImage)

    return right({
      dishImage,
    })
  }
}

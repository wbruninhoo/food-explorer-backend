import { InMemoryDishImagesRepository } from 'test/repositories/in-memory-dish-images-repository'
import { FakeUploader } from 'test/storage/fake-uploader'

import { InvalidImageTypeError } from './errors/invalid-image-type-error'
import { UploadDishImageUseCase } from './upload-dish-image'

let inMemoryDishImagesRepository: InMemoryDishImagesRepository

let fakeUploader: FakeUploader

let sut: UploadDishImageUseCase

describe('Upload Image', () => {
  beforeEach(() => {
    inMemoryDishImagesRepository = new InMemoryDishImagesRepository()

    fakeUploader = new FakeUploader()

    sut = new UploadDishImageUseCase(inMemoryDishImagesRepository, fakeUploader)
  })

  it('should be able to upload an image', async () => {
    const result = await sut.execute({
      dishId: '12321321',
      fileName: 'dish.webp',
      fileType: 'image/webp',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      dishImage: inMemoryDishImagesRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'dish.webp',
      }),
    )
  })

  it('should not be able to upload an image with invalid file type', async () => {
    const result = await sut.execute({
      dishId: '12321321',
      fileName: 'exemple.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidImageTypeError)
  })
})

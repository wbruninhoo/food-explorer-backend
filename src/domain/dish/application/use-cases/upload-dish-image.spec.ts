import { FakeUploader } from 'test/storage/fake-uploader'

import { InvalidImageTypeError } from './errors/invalid-image-type-error'
import { UploadDishImageUseCase } from './upload-dish-image'

let sut: UploadDishImageUseCase
let fakeUploader: FakeUploader

describe('Upload Image', () => {
  beforeEach(() => {
    fakeUploader = new FakeUploader()
    sut = new UploadDishImageUseCase(fakeUploader)
  })

  it('should be able to upload an image', async () => {
    const result = await sut.execute({
      fileName: 'dish.webp',
      fileType: 'image/webp',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'dish.webp',
      }),
    )
  })

  it('should not be able to upload an image with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'exemple.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidImageTypeError)
  })
})

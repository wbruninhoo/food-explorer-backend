import {
  UploadParams,
  Uploader,
} from '@/domain/dish/application/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const extension = fileName.split('.').pop()

    const url = `${crypto.randomUUID()}${extension ? `.${extension}` : ''}`

    this.uploads.push({
      fileName,
      url,
    })

    return {
      url,
    }
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DishImage,
  DishImageProps,
} from '@/domain/dish/enterprise/entities/dish-image'
import { faker } from '@faker-js/faker'

export function makeDishImage(
  override: Partial<DishImageProps> = {},
  id?: UniqueEntityID,
): DishImage {
  return DishImage.create(
    {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      dishId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

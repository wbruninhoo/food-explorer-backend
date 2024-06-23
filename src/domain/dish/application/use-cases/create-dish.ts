import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Dish } from '../../enterprise/entities/dish'
import { DishesRepository } from '../repositories/dishes-repository'

interface CreateDishUseCaseRequest {
  name: string
  description: string
  ingredients: string[]
  priceInCents: number
  imageUrl: string
  imageId: string
  categoryId: string
}

type CreateDishUseCaseResponse = Either<
  null,
  {
    dish: Dish
  }
>

export class CreateDishUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute(
    request: CreateDishUseCaseRequest,
  ): Promise<CreateDishUseCaseResponse> {
    const {
      name,
      description,
      ingredients,
      priceInCents,
      imageUrl,
      imageId,
      categoryId,
    } = request

    const dish = Dish.create({
      name,
      description,
      priceInCents,
      ingredients,
      imageUrl,
      imageId: new UniqueEntityID(imageId),
      categoryId: new UniqueEntityID(categoryId),
    })

    await this.dishesRepository.create(dish)

    return right({
      dish,
    })
  }
}

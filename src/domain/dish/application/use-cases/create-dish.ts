import { inject, injectable } from 'tsyringe'

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
  categoryId: string
}

type CreateDishUseCaseResponse = Either<
  null,
  {
    dish: Dish
  }
>

@injectable()
export class CreateDishUseCase {
  constructor(
    @inject('DishesRepository') private dishesRepository: DishesRepository,
  ) {}

  async execute(
    request: CreateDishUseCaseRequest,
  ): Promise<CreateDishUseCaseResponse> {
    const {
      name,
      description,
      ingredients,
      priceInCents,
      imageUrl,
      categoryId,
    } = request

    const dish = Dish.create({
      name,
      description,
      priceInCents,
      ingredients,
      imageUrl,
      categoryId: new UniqueEntityID(categoryId),
    })

    await this.dishesRepository.create(dish)

    return right({
      dish,
    })
  }
}

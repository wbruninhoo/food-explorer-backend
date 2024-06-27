import { inject, injectable } from 'tsyringe'

import { Either, left, right } from '@/core/either'

import { Dish } from '../../enterprise/entities/dish'
import { DishesRepository } from '../repositories/dishes-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditDishUseCaseRequest {
  dishId: string
  name: string
  description: string
  ingredients: string[]
  priceInCents: number
  imageUrl: string
  categoryId: string
}

type EditDishUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@injectable()
export class EditDishUseCase {
  constructor(
    @inject('DishesRepository') private dishesRepository: DishesRepository,
  ) {}

  async execute(
    request: EditDishUseCaseRequest,
  ): Promise<EditDishUseCaseResponse> {
    const { dishId, name, description, ingredients, priceInCents, imageUrl } =
      request

    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    dish.name = name
    dish.ingredients = ingredients
    dish.description = description
    dish.priceInCents = priceInCents
    dish.imageUrl = imageUrl

    await this.dishesRepository.save(dish)

    return right({
      dish,
    })
  }
}

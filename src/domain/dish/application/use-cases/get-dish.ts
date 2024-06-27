import { inject, injectable } from 'tsyringe'

import { Either, left, right } from '@/core/either'

import { Dish } from '../../enterprise/entities/dish'
import { DishesRepository } from '../repositories/dishes-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetDishUseCaseRequest {
  dishId: string
}

type GetDishUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dish: Dish
  }
>

@injectable()
export class GetDishUseCase {
  constructor(
    @inject('DishesRepository')
    private dishesRepository: DishesRepository,
  ) {}

  async execute(
    request: GetDishUseCaseRequest,
  ): Promise<GetDishUseCaseResponse> {
    const { dishId } = request

    const dish = await this.dishesRepository.findById(dishId)

    if (!dish) {
      return left(new ResourceNotFoundError())
    }

    return right({
      dish,
    })
  }
}

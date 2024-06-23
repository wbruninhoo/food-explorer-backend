import { Either, right } from '@/core/either'

import { Dish } from '../../enterprise/entities/dish'
import { DishesRepository } from '../repositories/dishes-repository'

interface FetchDishesUseCaseRequest {
  query: string
}

type FetchDishesUseCaseResponse = Either<
  null,
  {
    dishes: Dish[]
  }
>

export class FetchDishesUseCase {
  constructor(private dishesRepository: DishesRepository) {}

  async execute({
    query,
  }: FetchDishesUseCaseRequest): Promise<FetchDishesUseCaseResponse> {
    const dishes = await this.dishesRepository.findManyByQuery(query)

    return right({
      dishes,
    })
  }
}

import { inject, injectable } from 'tsyringe'

import { Either, right } from '@/core/either'

import { Dish } from '../../enterprise/entities/dish'
import { DishesRepository } from '../repositories/dishes-repository'

interface FetchDishesUseCaseRequest {
  query: string
  page: number
}

type FetchDishesUseCaseResponse = Either<
  null,
  {
    dishes: Dish[]
  }
>

@injectable()
export class FetchDishesUseCase {
  constructor(
    @inject('DishesRepository')
    private dishesRepository: DishesRepository,
  ) {}

  async execute({
    query,
    page,
  }: FetchDishesUseCaseRequest): Promise<FetchDishesUseCaseResponse> {
    const dishes = await this.dishesRepository.findManyByQuery(query, page)

    return right({
      dishes,
    })
  }
}

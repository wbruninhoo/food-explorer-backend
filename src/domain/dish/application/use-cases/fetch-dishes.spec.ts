import { makeCategory } from 'test/factories/make-category'
import { makeDish } from 'test/factories/make-dish'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchDishesUseCase } from './fetch-dishes'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryDishesRepository: InMemoryDishesRepository

let sut: FetchDishesUseCase

describe('Fetch Dishes', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryDishesRepository = new InMemoryDishesRepository()
    sut = new FetchDishesUseCase(inMemoryDishesRepository)
  })

  it('should be able to fetch dishes', async () => {
    const dish1 = makeDish()

    const dish2 = makeDish()

    const dish3 = makeDish()

    inMemoryDishesRepository.items.push(dish1, dish2, dish3)

    const result = await sut.execute({ query: '', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.dishes).toHaveLength(3)
  })

  it('should be able to fetch dishes by query', async () => {
    const dishId1 = 'dish-1'
    const dishId2 = 'dish-2'
    const dishId3 = 'dish-3'

    const category = makeCategory()
    inMemoryCategoriesRepository.items.push(category)

    const dish1 = makeDish(
      {
        categoryId: category.id,
        name: 'Moqueca Capixaba',
        ingredients: ['Peixe', 'Leite de coco', 'Azeite'],
      },
      new UniqueEntityID(dishId1),
    )

    const dish2 = makeDish(
      {
        categoryId: category.id,
        name: 'Frango Xacré',
        ingredients: ['Peito de frango', 'Tucupi', 'Urucum'],
      },
      new UniqueEntityID(dishId2),
    )

    const dish3 = makeDish(
      {
        categoryId: category.id,
        name: 'Ravioli de Abóbora',
        ingredients: ['Massa fresca', 'Abóbora', 'Queijo'],
      },
      new UniqueEntityID(dishId3),
    )

    inMemoryDishesRepository.items.push(dish1, dish2, dish3)

    const result = await sut.execute({ query: 'peito', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.dishes).toEqual([
      expect.objectContaining({ name: 'Frango Xacré' }),
    ])
  })
})

import { randomUUID } from 'crypto'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { faker } from '@faker-js/faker'

import { CreateDishUseCase } from './create-dish'

let inMemoryDishesRepository: InMemoryDishesRepository

let sut: CreateDishUseCase

describe('Create Dish', () => {
  beforeEach(() => {
    inMemoryDishesRepository = new InMemoryDishesRepository()

    sut = new CreateDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to create a new dish', async () => {
    const result = await sut.execute({
      categoryId: randomUUID(),
      name: 'Salada Ravanello',
      description:
        'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
      priceInCents: 1000,
      ingredients: ['alface', 'cebola'],
      imageUrl: faker.internet.url(),
      imageId: randomUUID(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      dish: inMemoryDishesRepository.items[0],
    })
  })
})

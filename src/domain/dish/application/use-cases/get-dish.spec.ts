import { makeDish } from 'test/factories/make-dish'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { GetDishUseCase } from './get-dish'

let inMemoryDishesRepository: InMemoryDishesRepository

let sut: GetDishUseCase

describe('Get Dish', () => {
  beforeEach(() => {
    inMemoryDishesRepository = new InMemoryDishesRepository()

    sut = new GetDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to get a dish', async () => {
    const dish = makeDish({
      name: 'Salada Ravanello',
      description:
        'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
      priceInCents: 2000,
      ingredients: ['alface', 'cebola'],
    })

    inMemoryDishesRepository.items.push(dish)

    const result = await sut.execute({
      dishId: dish.id.toString(),
    })

    console.log(inMemoryDishesRepository.items[0])

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      dish: expect.objectContaining({
        name: 'Salada Ravanello',
        ingredients: expect.arrayContaining(['alface', 'cebola']),
      }),
    })
  })
})

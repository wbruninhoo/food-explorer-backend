import { makeDish } from 'test/factories/make-dish'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { EditDishUseCase } from './edit-dish'

let inMemoryDishesRepository: InMemoryDishesRepository

let sut: EditDishUseCase

describe('Edit Dish', () => {
  beforeEach(() => {
    inMemoryDishesRepository = new InMemoryDishesRepository()

    sut = new EditDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to edit a dish', async () => {
    const dish = makeDish({})

    inMemoryDishesRepository.items.push(dish)

    const result = await sut.execute({
      dishId: dish.id.toString(),
      categoryId: 'category-2',
      imageUrl: 'https://exemple.com',
      ingredients: ['batata', 'mussarela'],
      name: 'Salada Ravanello',
      description:
        'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
      priceInCents: 1000,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDishesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Salada Ravanello',
        description:
          'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
        priceInCents: 1000,
      }),
    )
    expect(inMemoryDishesRepository.items[0].ingredients).toHaveLength(2)
  })
})

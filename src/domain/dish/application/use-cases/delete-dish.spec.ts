import { makeDish } from 'test/factories/make-dish'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { DeleteDishUseCase } from './delete-dish'

let inMemoryDishesRepository: InMemoryDishesRepository

let sut: DeleteDishUseCase

describe('Delete Dish', () => {
  beforeEach(() => {
    inMemoryDishesRepository = new InMemoryDishesRepository()

    sut = new DeleteDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to delete a dish', async () => {
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

    expect(result.isRight()).toBe(true)
    expect(inMemoryDishesRepository.items).toHaveLength(0)
  })
})

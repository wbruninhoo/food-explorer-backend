import { makeCategory } from 'test/factories/make-category'
import { makeDish } from 'test/factories/make-dish'
import { makeDishImage } from 'test/factories/make-dish-image'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'
import { InMemoryDishImagesRepository } from 'test/repositories/in-memory-dish-images-repository'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { GetDishUseCase } from './get-dish'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryDishImagesRepository: InMemoryDishImagesRepository
let inMemoryDishesRepository: InMemoryDishesRepository

let sut: GetDishUseCase

describe('Get Dish', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryDishImagesRepository = new InMemoryDishImagesRepository()
    inMemoryDishesRepository = new InMemoryDishesRepository()

    sut = new GetDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to get a dish', async () => {
    const dishId = 'dish-1'

    const category = makeCategory()
    inMemoryCategoriesRepository.items.push(category)

    const dishImage = makeDishImage({
      dishId: new UniqueEntityID(dishId),
    })

    inMemoryDishImagesRepository.items.push(dishImage)

    const dish = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage.id,
        imageUrl: dishImage.url,
        name: 'Salada Ravanello',
        description:
          'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
        priceInCents: 2000,
        ingredients: ['alface', 'cebola'],
      },
      new UniqueEntityID(dishId),
    )

    inMemoryDishesRepository.items.push(dish)

    const result = await sut.execute({
      dishId: 'dish-1',
    })

    expect(result.isRight()).toBe(true)
  })
})

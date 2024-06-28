import { makeIngredient } from 'test/factories/make-ingredient'
import { InMemoryIngredientsRepository } from 'test/repositories/in-memory-ingredients-repository'

import { SearchIngredientsUseCase } from './search-ingredients'

let inMemoryIngredientsRepository: InMemoryIngredientsRepository

let sut: SearchIngredientsUseCase

describe('Search Ingredients', () => {
  beforeEach(() => {
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository()

    sut = new SearchIngredientsUseCase(inMemoryIngredientsRepository)
  })

  it('should be able to search ingredients by name', async () => {
    inMemoryIngredientsRepository.items.push(
      makeIngredient({ name: 'tomate' }),
      makeIngredient({ name: 'rabanete' }),
      makeIngredient({ name: 'cebola' }),
    )

    const result = await sut.execute({
      query: 't',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ingredients).toHaveLength(2)
    expect(result.value).toEqual({
      ingredients: [
        expect.objectContaining({ name: 'tomate' }),
        expect.objectContaining({ name: 'rabanete' }),
      ],
    })
  })
})

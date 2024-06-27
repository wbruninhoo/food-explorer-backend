export interface KnexDish {
  id: string
  category_id: string
  image_url: string
  name: string
  description: string
  ingredients: string[]
  price_in_cents: number
  created_at: Date
  updated_at?: Date | null
}

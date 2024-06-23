import { CustomersRepository } from '@/domain/account/application/repositories/customers-repository'
import { Customer } from '@/domain/account/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email)

    return customer || null
  }

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }
}

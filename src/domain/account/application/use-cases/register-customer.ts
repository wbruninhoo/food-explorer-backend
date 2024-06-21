import { Either, left, right } from '@/core/either'

import { Customer } from '../../enterprise/entities/customer'
import { HashGenerator } from '../cryptography/hash-generator'
import { CustomersRepository } from '../repositories/customers-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterCustomerUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    customer: Customer
  }
>

export class RegisterCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(
    request: RegisterCustomerUseCaseRequest,
  ): Promise<RegisterCustomerUseCaseResponse> {
    const { email, name, password } = request

    const customerWithSameEMail =
      await this.customersRepository.findByEmail(email)

    if (customerWithSameEMail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const customer = Customer.create({
      email,
      name,
      password: hashedPassword,
    })

    await this.customersRepository.create(customer)

    return right({
      customer,
    })
  }
}

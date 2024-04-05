import { faker } from '@faker-js/faker';
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Controller, Post } from "@nestjs/common";
import { EmployeeEntity } from "../entities/employee.entity";

@Controller()
export class EmployeeController {

  constructor(
    @InjectRepository(EmployeeEntity)
    private repo: EntityRepository<EmployeeEntity>,
  ) { }


  @Post('clear_db')
  async clearDb() {
    return await this.repo.nativeDelete({});
  }

  @Post('mock_db')
  async loadMockData() {
    const entities = [...Array(50)].map(_ =>
      new EmployeeEntity({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        join: faker.date.past(),
        birth: faker.date.past(),
        salary: faker.number.int({ min: 5000, max: 15000 }),
        title: faker.person.jobTitle(),
        department: faker.person.jobArea(),
      })
    )
    return await this.repo.insertMany(entities)
  }

}
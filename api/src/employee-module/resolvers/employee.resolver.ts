import { Logger } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Employee, EmployeeDto, EmployeeParams } from '../schema/employee.schema';
import { EmployeeService } from '../services/employee.service';

@Resolver('Employee')
export class EmployeeResolver {
  private readonly logger = new Logger(EmployeeResolver.name);

  constructor(private readonly employeesService: EmployeeService) { }

  @Query(() => [Employee])
  async allEmployees(
    @Args('params', { nullable: true }) params: EmployeeParams,
  ): Promise<Employee[]> {
    this.logger.log(`Get all Employees for params: ${JSON.stringify(params)}`);
    return await this.employeesService.findAll(params);
  }

  @Query(() => Employee)
  async employee(@Args('id') id: number): Promise<Employee> {
    return await this.employeesService.findOne(id);
  }

  @Mutation(() => Int)
  async createEmployee(
    @Args('employee') employee: EmployeeDto,
  ): Promise<number> {
    return await this.employeesService.create(employee);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('id') id: number,
    @Args('employee') employee: EmployeeDto,
  ): Promise<Employee> {
    return await this.employeesService.update(id, employee);
  }

  @Mutation(() => Int)
  async deleteEmployee(@Args('id') id: number): Promise<number> {
    return await this.employeesService.remove(id);
  }
}

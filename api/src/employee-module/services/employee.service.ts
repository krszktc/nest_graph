import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { getAllEmployees, getEmployee, getEntity } from '../converters/employee.converter';
import { EmployeeEntity } from '../entities/employee.entity';
import { Employee, EmployeeDto, EmployeeParams } from '../schema/employee.schema';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @InjectRepository(EmployeeEntity)
    private repo: EntityRepository<EmployeeEntity>
  ) { }

  async findAll(params: EmployeeParams): Promise<Employee[]> {
    this.logger.log(`Query all Employees for params: ${JSON.stringify(params)}`);
    const queryParams = {};
    if (params?.filter) {
      const { salaryRange, ...rest } = params.filter
      const whereFilters = { ...rest };
      if (salaryRange) {
        whereFilters['salary'] = {
          $gte: salaryRange.from,
          $lte: salaryRange.to
        }
      }
      queryParams['where'] = { ...whereFilters };
    }
    if (params?.sort) {
      queryParams['orderBy'] = { ...params.sort }
    }
    const entities = await this.repo.findAll(queryParams);
    return getAllEmployees(entities);
  }

  async findOne(id: number): Promise<Employee> {
    const entity = await this.repo.findOne({ id });
    return getEmployee(entity)
  }

  async create(dto: EmployeeDto): Promise<number> {
    const entity = getEntity(dto);
    return await this.repo.insert(entity);
  }

  async update(id: number, dto: EmployeeDto): Promise<Employee> {
    const entity = await this.repo.findOne({ id });
    const entityManager = this.repo.getEntityManager();
    entityManager.assign(entity, dto);

    await entityManager.flush();
    return getEmployee(entity);
  }

  async remove(id: number): Promise<number> {
    return await this.repo.nativeDelete({ id });
  }
}

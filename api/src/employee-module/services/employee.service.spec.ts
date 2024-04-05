import { EntityManager } from '@mikro-orm/core';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeDto } from '../schema/employee.schema';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { TestingModule, Test } from '@nestjs/testing';


const firstEntity = new EmployeeEntity({
  firstName: 'SomeName',
  lastName: 'SomeSurname',
  join: new Date('2022-10-01'),
  birth: new Date('2000-10-01'),
  salary: 1000,
  title: 'Some Title',
  department: 'Some Department'
});
firstEntity.id = 11;

const secondEntity = new EmployeeEntity({
  firstName: 'OtherName',
  lastName: 'OtherSurname',
  join: new Date('2022-10-02'),
  birth: new Date('2000-10-02'),
  salary: 2000,
  title: 'Other Title',
  department: 'Other Department'
});
secondEntity.id = 22;

const mockDto = new EmployeeDto({
  firstName: 'Dto Name',
  lastName: 'Dto Surname',
  join: '2022-12-12',
  birth: '2000-12-112',
  salary: 15000,
  title: 'Dto Title',
  department: 'Dto Department'
});


describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockEm = {
    flush: jest.fn(),
    assign: jest.fn(),
  };

  const mockRepo = {
    nativeDelete: jest.fn().mockResolvedValue(1),
    insert: jest.fn().mockResolvedValue(11),
    findOne: jest.fn().mockResolvedValue(firstEntity),
    findAll: jest.fn().mockResolvedValue([firstEntity, secondEntity]),
    getEntityManager: jest.fn().mockReturnValue(mockEm),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EntityManager,
          useValue: mockEm,
        },
        {
          provide: getRepositoryToken(EmployeeEntity),
          useValue: mockRepo
        }
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should return all employees', async () => {
    const employees = await service.findAll({});
    expect(employees).toHaveLength(2);
    expect(employees[0].firstName).toEqual(firstEntity.firstName);
    expect(employees[0].lastName).toEqual(firstEntity.lastName);
    expect(employees[1].firstName).toEqual(secondEntity.firstName);
    expect(employees[1].lastName).toEqual(secondEntity.lastName);
  });

  it('should return employee with given id', async () => {
    const employee = await service.findOne(1);
    expect(employee).toBeDefined();
    expect(employee.firstName).toEqual(firstEntity.firstName);
    expect(employee.lastName).toEqual(firstEntity.lastName);
  });

  it('should create employee', async () => {
    const employeeId = await service.create(mockDto);
    expect(employeeId).toEqual(11)
  });

  it('should update employee', async () => {
    const employee = await service.update(11, mockDto);
    expect(employee).toBeDefined();
    expect(employee.firstName).toEqual(firstEntity.firstName);
    expect(employee.lastName).toEqual(firstEntity.lastName);
  });

  it('should remove employee', async () => {
    const rowCount = await service.remove(1);
    expect(rowCount).toEqual(1);
  });

});

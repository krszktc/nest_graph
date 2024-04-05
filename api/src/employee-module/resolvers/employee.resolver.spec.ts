import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../schema/employee.schema';


const MOCK_EMPLOYEES = [
  new Employee({
    id: 11,
    firstName: 'SomeName',
    lastName: 'SomeSurname',
    join: '2020-10-01',
    birth: '2000-10-01',
    salary: 10000,
    title: 'Some Title',
    department: 'Some Department'
  }),
  new Employee({
    id: 22,
    firstName: 'OtherName',
    lastName: 'OtherSurname',
    join: '2020-10-02',
    birth: '2000-10-02',
    salary: 20000,
    title: 'Other Title',
    department: 'Other Department'
  })
]

class MockEmployeeService {
  findAll = async () => MOCK_EMPLOYEES;
  findOne = async (_: number) => MOCK_EMPLOYEES[0];
  create = async (_: any) => 33;
  update = async (_id: number, _model: any) => MOCK_EMPLOYEES[1];
  remove = async (_: number) => 1;
}

describe('EmployeeResolver', () => {
  let resolver: EmployeeResolver;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeResolver,
        { provide: EmployeeService, useClass: MockEmployeeService },
      ],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should return an array of employees', async () => {
    const result: Employee[] = await resolver.allEmployees(null);
    expect(result).toEqual(MOCK_EMPLOYEES);
  });

  it('should return a single employee', async () => {
    const result: Employee = await resolver.employee(1);
    expect(result).toEqual(MOCK_EMPLOYEES[0]);
  });

  it('should return the ID of the created employee', async () => {
    const result: number = await resolver.createEmployee({ firstName: 'Max' });
    expect(result).toEqual(33);
  });

  it('should return the updated employee', async () => {
    const result: Employee = await resolver.updateEmployee(1, { firstName: 'Max' });
    expect(result).toEqual(MOCK_EMPLOYEES[1]);
  });

  it('should return the ID of the deleted employee', async () => {
    const result: number = await resolver.deleteEmployee(1);
    expect(result).toEqual(1);
  });

});

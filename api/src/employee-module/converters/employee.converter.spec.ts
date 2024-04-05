import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeDto } from "../schema/employee.schema";
import { getEmployee, getEntity } from "./employee.converter";


describe('EmployeeConverter', () => {

  it('should get Employee from Entity', async () => {
    const join = '2020-10-10';
    const birth = '2000-10-10';
    const entity = new EmployeeEntity({
      firstName: 'firstName',
      lastName: 'lastName',
      join: new Date(join),
      birth: new Date(birth),
      salary: 15000,
      title: 'someTitle',
      department: 'someDepartment'
    })
    entity.id = 11;  //auto incremented

    const employee = getEmployee(entity);

    expect(entity.id).toBe(employee.id);
    expect(entity.firstName).toBe(employee.firstName);
    expect(entity.lastName).toBe(employee.lastName);
    expect(join).toBe(employee.join);
    expect(birth).toBe(employee.birth);
    expect(entity.salary).toBe(employee.salary);
    expect(entity.title).toBe(employee.title);
    expect(entity.department).toBe(employee.department);
  });

  it('should get Entity from Employee', async () => {
    const dto = new EmployeeDto({
      firstName: 'firstName',
      lastName: 'lastName',
      join: '2020-10-10',
      birth: '2000-10-10',
      salary: 15000,
      title: 'someTitle',
      department: 'someDepartment'
    });
    const entity = getEntity(dto)
    expect(entity.firstName).toBe(dto.firstName);
    expect(entity.lastName).toBe(dto.lastName);
    expect(entity.join).toEqual(new Date(dto.join));
    expect(entity.birth).toEqual(new Date(dto.birth));
    expect(entity.salary).toBe(dto.salary);
    expect(entity.title).toBe(dto.title);
    expect(entity.department).toBe(dto.department);
  });

  it('should failed to get Entity from Employee', async () => {
    const dto = new EmployeeDto({
      firstName: 'firstName'
    });
    const response = () => {
      getEntity(dto);
    };
    expect(response).toThrow(Error);
  });

});
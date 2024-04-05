import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeDto, Employee } from "../schema/employee.schema";

function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export function getEmployee(entity: EmployeeEntity): Employee {
  return new Employee({
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    join: getDateString(entity.join),
    birth: getDateString(entity.birth),
    salary: entity.salary,
    title: entity.title,
    department: entity.department
  });
}

export function getAllEmployees(entities: EmployeeEntity[]): Employee[] {
  return entities.map(entity => getEmployee(entity));
}

export function getEntity(dto: EmployeeDto): EmployeeEntity {
  if (dto.firstName
    && dto.lastName
    && dto.join
    && dto.birth
    && dto.salary
    && dto.title
    && dto.department
  ) {
    return new EmployeeEntity({
      firstName: dto.firstName,
      lastName: dto.lastName,
      join: new Date(dto.join),
      birth: new Date(dto.birth),
      salary: dto.salary,
      title: dto.title,
      department: dto.department
    });
  }
  throw new Error("Dto need to have all fields to create Entity");
}

export function getAllEntities(dtos: EmployeeDto[]): EmployeeEntity[] {
  return dtos.map(dto => getEntity(dto));
}
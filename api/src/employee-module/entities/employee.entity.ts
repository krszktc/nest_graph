import { DateType, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Employees' })
export class EmployeeEntity {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ type: DateType })
  join: Date;

  @Property({ type: DateType })
  birth: Date;

  @Property()
  salary: number;

  @Property()
  title: string;

  @Property()
  department: string;

  constructor(data: Omit<EmployeeEntity, 'id'>) {
    Object.assign(this, data);
  }
}

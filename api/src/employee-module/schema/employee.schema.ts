import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortDirection, {
  name: 'SortDirection'
})

@InputType()
export class EmployeeSort {
  @Field(type => SortDirection, { nullable: true })
  join?: SortDirection;

  @Field(type => SortDirection, { nullable: true })
  salary?: SortDirection;
}

@InputType()
export class EmployeeSalaryRange {
  @Field(type => Int)
  from: number;

  @Field(type => Int)
  to: number;
}

@InputType()
export class EmployeeFilter {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  department?: string;

  @Field(type => EmployeeSalaryRange, { nullable: true })
  salaryRange?: EmployeeSalaryRange;
}

@InputType()
export class EmployeeParams {
  @Field(type => EmployeeFilter, { nullable: true })
  filter?: EmployeeFilter;

  @Field(type => EmployeeSort, { nullable: true })
  sort?: EmployeeSort;
}

@ObjectType()
@InputType()
export class EmployeeDto {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  join?: string;

  @Field({ nullable: true })
  birth?: string;

  @Field({ nullable: true })
  salary?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  department?: string;

  constructor(data: Partial<EmployeeDto>) {
    Object.assign(this, data);
  }
}

@ObjectType()
export class Employee extends EmployeeDto {
  @Field(type => Int)
  id: number;

  constructor(data: Partial<Employee>) {
    super(data);
    Object.assign(this, data);
  }
}

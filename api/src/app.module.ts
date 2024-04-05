import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee-module/employee.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([EmployeeEntity]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}

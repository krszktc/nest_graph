import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeEntity } from '../entities/employee.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

class MockRepository {
  async nativeDelete() { }
  async insertMany() { }
}

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let mockRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: getRepositoryToken(EmployeeEntity),
          useClass: MockRepository,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    mockRepository = module.get(getRepositoryToken(EmployeeEntity));
  });

  it('should clear the database', async () => {
    const nativeDeleteSpy = jest.spyOn(mockRepository, 'nativeDelete').mockResolvedValue();
    await expect(controller.clearDb()).resolves.toBeUndefined();
    expect(nativeDeleteSpy).toHaveBeenCalled();
  });

  it('should load mock data into the database', async () => {
    const insertManySpy = jest.spyOn(mockRepository, 'insertMany').mockResolvedValue();
    await expect(controller.loadMockData()).resolves.toBeUndefined();
    expect(insertManySpy).toHaveBeenCalled();
  });

});
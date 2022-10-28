import { Test, TestingModule } from '@nestjs/testing';
import { GymsController } from '../gyms.controller';
import { GymsService } from '../gyms.service';
import { mockGymDTOStub } from './stubs/gym.dto.stub';

describe('GymsController', () => {
  let controller: GymsController;

  const mockGymService = {
    createGym: jest.fn((dto) => {
      return { dto };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymsController],
      providers: [GymsService],
    })
      .overrideProvider(GymsService)
      .useValue(mockGymService)
      .compile();

    controller = module.get<GymsController>(GymsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

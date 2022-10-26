import { Test, TestingModule } from '@nestjs/testing';
import { TrainersController } from '../trainers.controller';
import { TrainersService } from '../trainers.service';

describe('TrainersController', () => {
  let controller: TrainersController;

  const mockTrainerService = {
    createGym: jest.fn((dto) => {
      return { dto };
    }),
  };

  beforeEach(async () => {
    const mockTrainerService = {
      createTrainer: jest.fn((dto) => {
        return { dto };
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainersController],
      providers: [TrainersService],
    })
      .overrideProvider(TrainersService)
      .useValue(mockTrainerService)
      .compile();

    controller = module.get<TrainersController>(TrainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

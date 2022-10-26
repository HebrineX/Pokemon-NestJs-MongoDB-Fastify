import { Test, TestingModule } from '@nestjs/testing';
import { TrainersService } from '../trainers.service';

describe('TrainersService', () => {
  let service: TrainersService;

  beforeEach(async () => {
    const mockTrainerService = {
      createTrainer: jest.fn((dto) => {
        return { dto };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainersService],
    })
      .overrideProvider(TrainersService)
      .useValue(mockTrainerService)
      .compile();
    service = module.get<TrainersService>(TrainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

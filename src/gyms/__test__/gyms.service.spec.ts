import { Test, TestingModule } from '@nestjs/testing';
import { GymsService } from '../gyms.service';

describe('GymsService', () => {
  let service: GymsService;

  beforeEach(async () => {
    const mockGymService = {
      createGym: jest.fn((dto) => {
        return { dto };
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymsService],
    })
      .overrideProvider(GymsService)
      .useValue(mockGymService)
      .compile();

    service = module.get<GymsService>(GymsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

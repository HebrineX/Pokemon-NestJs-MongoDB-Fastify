import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsService } from '../pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;

  const mockPokemonService = {
    createPokemon: jest.fn((dto) => {
      return { dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    })
      .overrideProvider(PokemonsService)
      .useValue(mockPokemonService)
      .compile();

    service = module.get<PokemonsService>(PokemonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

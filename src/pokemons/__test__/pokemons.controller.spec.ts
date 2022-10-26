import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';
import { PokemonsService } from '../pokemons.service';

describe('PokemonsController', () => {
  let controller: PokemonsController;

  const mockPokemonService = {
    createPokemon: jest.fn((dto) => {
      return { dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [PokemonsService],
    })

      .overrideProvider(PokemonsService)
      .useValue(mockPokemonService)
      .compile();

    controller = module.get<PokemonsController>(PokemonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

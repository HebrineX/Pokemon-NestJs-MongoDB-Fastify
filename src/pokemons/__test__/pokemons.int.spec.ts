import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ObjectID } from 'bson';
import mongoose, { Model } from 'mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getModelToken } from '@nestjs/mongoose';
import { Pokemon } from '../interfaces/pokemon.interface';

describe('Integration test Pokemon', () => {
  let app: NestFastifyApplication;
  let pokemonModel: Model<Pokemon>;

  beforeAll(async () => {
    mongoose.connect('mongodb://localhost/Pokemon-test');

    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    pokemonModel = module.get<Model<Pokemon>>(getModelToken('Pokemon'));
  }, 10000);

  describe('Pokemon Endpoints', () => {
    const newPokemon = {
      name: 'Bulbasaur',
      alias: 'Pbt',
      type: ['Poison', 'Grass'],
      imageURL: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/.png',
      pokedexId: 1,
      level: 4,
      experience: 133,
      id: new ObjectID('000000000000000000000001'),
    };

    beforeAll(async () => {
      await pokemonModel.create({
        ...newPokemon,
        _id: newPokemon.id,
      });
    });
    afterAll(async () => {
      await pokemonModel.findByIdAndDelete(newPokemon.id);
    });
    describe('GET', () => {
      describe('Get all Pokemon', () => {
        it('should return 200 ', async () => {
          const data = await app.inject({
            method: 'GET',
            url: `/pokemons`,
          });
          expect(data.statusCode).toEqual(200);
          expect(data.headers['content-type']).toEqual(
            'application/json; charset=utf-8',
          );
        });
      });
    });
    afterAll(() => {
      mongoose.connection.close();
    });
  });
});

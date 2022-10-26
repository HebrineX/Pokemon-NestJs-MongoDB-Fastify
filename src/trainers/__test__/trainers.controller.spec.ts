import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ObjectID } from 'bson';
import mongoose, { Model } from 'mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getModelToken } from '@nestjs/mongoose';
import { Trainer } from '../interfaces/trainers.interface';

describe('Integration test Gyms', () => {
  let app: NestFastifyApplication;
  let trainerModel: Model<Trainer>;

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

    trainerModel = module.get<Model<Trainer>>(getModelToken('Trainer'));
  }, 10000);

  describe('Trainer Endpoints', () => {
    const newTrainer = {
      name: 'string',
      medalls: ['idgym'],
      team: ['idPoke', 'idPoke'],
      pokeballs: 10,
      pokedexCompleted: [1, 2, 3],
      pokemonTrunk: ['idPoke'],
      id: new ObjectID('000000000000000000000001'),
    };

    beforeAll(async () => {
      await trainerModel.create({
        ...newTrainer,
        _id: newTrainer.id,
      });
    });
    afterAll(async () => {
      await trainerModel.findByIdAndDelete(newTrainer.id);
    });
    describe('GET', () => {
      describe('Get all Trainer', () => {
        it('should return 200 ', async () => {
          const data = await app.inject({
            method: 'GET',
            url: `/trainers`,
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

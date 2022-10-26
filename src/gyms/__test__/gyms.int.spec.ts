import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ObjectID } from 'bson';
import mongoose, { Model } from 'mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Gym } from '../interfaces/gym.interfaces';
import { getModelToken } from '@nestjs/mongoose';

describe('Integration test Gyms', () => {
  let app: NestFastifyApplication;
  let gymModel: Model<Gym>;

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

    gymModel = module.get<Model<Gym>>(getModelToken('Gym'));
  }, 10000);

  describe('Gym Endpoints', () => {
    const newGym = {
      city: 'Viridian City',
      typeMedall: 'Ground-type',
      leader: ' Giovanni',
      imageMedall:
        'https://images.wikidexcdn.net/mwuploads/wikidex/1/16/latest/20180812035006/Medalla_Tierra.png',
      recruits: ['Jr. Trainer Male', 'Sailor', 'Gentelman'],
      id: new ObjectID('000000000000000000000001'),
    };

    beforeAll(async () => {
      await gymModel.create({
        ...newGym,
        _id: newGym.id,
      });
    });
    afterAll(async () => {
      await gymModel.findByIdAndDelete(newGym.id);
    });
    describe('GET', () => {
      describe('Get all gyms', () => {
        it('should return 200 ', async () => {
          const data = await app.inject({
            method: 'GET',
            url: `/gyms`,
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

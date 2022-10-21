import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GymSchema } from './schemas/gym.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Gym', schema: GymSchema }])],
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule {}

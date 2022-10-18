import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerSchema } from './schemas/trainer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trainer', schema: TrainerSchema }]),
  ],
  providers: [TrainersService],
  controllers: [TrainersController],
})
export class TrainersModule {}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './interfaces/trainers.interface';
import { CreateTrainerDTO } from './dto/trainer.dto';
@Injectable()
export class TrainersService {
  constructor(
    @InjectModel('Trainer') private readonly trainerModel: Model<Trainer>,
  ) {}

  async getTrainers(): Promise<Trainer[]> {
    const trainers = await this.trainerModel.find();
    return trainers;
  }

  async getTrainer(trainerId: string): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(trainerId);
    return trainer;
  }

  async createTrainer(createTrainerDTO: CreateTrainerDTO): Promise<Trainer> {
    const newTrainer = new this.trainerModel(createTrainerDTO);
    return await newTrainer.save();
  }

  async updateTrainer(
    createTrainerDTO: CreateTrainerDTO,
    trainerId: string,
  ): Promise<Trainer> {
    const updateTrainer = await this.trainerModel.findByIdAndUpdate(
      trainerId,
      createTrainerDTO,
      { new: true },
    );
    return updateTrainer;
  }

  async deletePokemon(trainerId: string): Promise<Trainer> {
    const deleteTrainer = await this.trainerModel.findByIdAndDelete(trainerId);
    return deleteTrainer;
  }
}

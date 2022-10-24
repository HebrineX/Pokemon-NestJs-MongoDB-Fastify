import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Gym } from './interfaces/gym.interfaces';
import { CreateGymDTO } from './dto/gym.dto';

@Injectable()
export class GymsService {
  constructor(@InjectModel('Gym') private readonly gymModel: Model<Gym>) {}

  async getGyms(): Promise<Gym[]> {
    const gym = await this.gymModel.find();
    return gym;
  }

  async getGym(gymId: string): Promise<Gym> {
    const trainer = await this.gymModel.findById(gymId);
    return trainer;
  }

  async createGym(createGymDTO: CreateGymDTO): Promise<Gym> {
    const newGym = new this.gymModel(createGymDTO);
    return await newGym.save();
  }

  async generateGyms(createGymDTO: [CreateGymDTO]): Promise<Gym[]> {
    return await this.gymModel.create(createGymDTO);
  }

  async updateGym(createGymDTO: CreateGymDTO, gymId: string): Promise<Gym> {
    const updateGym = await this.gymModel.findByIdAndUpdate(
      gymId,
      createGymDTO,
      { new: true },
    );
    return updateGym;
  }

  async deleteGym(gymId: string): Promise<Gym> {
    const deleteGym = await this.gymModel.findByIdAndDelete(gymId);
    return deleteGym;
  }
}

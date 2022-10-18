import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainerDTO } from './dto/trainer.dto';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private trainersServices: TrainersService) {}

  @Get('/')
  async getTrainers(@Res() res) {
    const trainers = await this.trainersServices.getTrainers();
    return res.status(HttpStatus.OK).json({
      message: 'Trainers In Database',
      trainers,
    });
  }

  @Get(':trainerId')
  async getTrainer(@Res() res, @Param('trainerId') trainerId: string) {
    if (trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      const trainer = await this.trainersServices.getTrainer(trainerId);
      if (!trainer) throw new NotFoundException('Trainer Does Not exists');
      return res.status(HttpStatus.OK).json({
        message: 'Searched Trainer is : ',
        trainer,
      });
    }
    res.status(HttpStatus.NOT_ACCEPTABLE).send({
      message: `The ID ${trainerId} must be an legal ID Trainer`,
    });
  }

  @Post('/create')
  async createTrainer(@Res() res, @Body() createTrainerDTO: CreateTrainerDTO) {
    const createTrainer = await this.trainersServices.createTrainer(
      createTrainerDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Trainer Succefuly Created',
      createTrainer,
    });
  }

  @Put('/update/:trainerId')
  async updateTrainer(
    @Res() res,
    @Body() createTrainerDTO: CreateTrainerDTO,
    @Param('trainerId') trainerId: string,
  ) {
    if (trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      const updateTrainer = await this.trainersServices.updateTrainer(
        createTrainerDTO,
        trainerId,
      );
      if (!updateTrainer)
        throw new NotFoundException('Trainer Does Not exists');
      return res.status(HttpStatus.OK).json({
        message: 'Trainer Edited Succefully',
        updateTrainer,
      });
    }
    res.status(HttpStatus.NOT_ACCEPTABLE).send({
      message: `The ID ${trainerId} must be an legal ID Trainer`,
    });
  }

  @Delete('/delete/:trainerId')
  async deleteTrainer(@Res() res, @Param('trainerId') trainerId: string) {
    if (!trainerId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${trainerId} must be an legal ID Trainer`,
      });
    }
    const deleteTrainer = await this.trainersServices.deletePokemon(trainerId);

    if (!deleteTrainer) throw new NotFoundException('Trainer Does Not exists');

    return res.status(HttpStatus.OK).json({
      message: 'Trainer Succefully Deleted',
      deleteTrainer,
    });
  }
}

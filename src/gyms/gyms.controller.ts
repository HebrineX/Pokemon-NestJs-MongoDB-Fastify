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
import { CreateGymDTO } from './dto/gym.dto';
import { GymsService } from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(private gymServices: GymsService) {}

  @Get('/')
  async getGyms(@Res() res) {
    const gyms = this.gymServices.getGyms();
    return res.status(HttpStatus.OK).json({
      message: 'Gyms in Database',
      gyms,
    });
  }

  @Get(':gymId')
  async getGym(@Res() res, @Param('gymId') gimId: string) {
    const gym = await this.gymServices.getGym(gimId);
    if (!gym) throw new NotFoundException('Gym Does not exists');
    return res.status(HttpStatus.OK).json({
      message: ' Searched Gym is :',
      gym,
    });
  }

  @Post('/create')
  async createGym(@Res() res, @Body() createGymDTO: CreateGymDTO) {
    const createGym = await this.gymServices.createGym(createGymDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Gym succefully created',
      createGym,
    });
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class GymAlreadyExists extends HttpException {
  constructor() {
    super('Gym already exists!', HttpStatus.BAD_REQUEST);
  }
}

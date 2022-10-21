import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemons/pokemons.module';
import { TrainersModule } from './trainers/trainers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GymsModule } from './gyms/gyms.module';

@Module({
  imports: [
    PokemonsModule,
    TrainersModule,
    MongooseModule.forRoot('mongodb://localhost/Pokemon-Proyect'),
    GymsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

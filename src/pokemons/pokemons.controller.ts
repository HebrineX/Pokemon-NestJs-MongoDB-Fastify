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
import { CreatePokemonDTO } from './dto/pokemon.dto';
import { PokemonsService } from './pokemons.service';
@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsServices: PokemonsService) {}
  @Get('/')
  async getPokemons(@Res() res) {
    const pokemons = await this.pokemonsServices.getPokemons();
    return res.status(HttpStatus.OK).json({
      message: 'Pokemons In Database',
      pokemons,
    });
  }

  @Get(':pokedexIdParam')
  async getPokemon(
    @Res() res,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const pokemon = await this.pokemonsServices.getPokemon(
      parseInt(pokedexIdParam),
    );
    if (!pokemon) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Searched Pokemon is :',
      pokemon,
    });
  }

  @Post('/create')
  async createPokemon(@Res() res, @Body() createPokemonDTO: CreatePokemonDTO) {
    const createPoke = await this.pokemonsServices.createPokemon(
      createPokemonDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Succefully Created',
      createPoke,
    });
  }

  @Put('/update/:pokedexIdParam')
  async updatePokemon(
    @Res() res,
    @Body() createPokemonDTO: CreatePokemonDTO,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const updatePoke = await this.pokemonsServices.updatePokemon(
      createPokemonDTO,
      parseInt(pokedexIdParam),
    );
    if (!updatePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Edited Succefully',
      updatePoke,
    });
  }

  @Delete('/delete/:pokedexIdParam')
  async deletePokemon(
    @Res() res,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const deletePoke = await this.pokemonsServices.deletePokemon(
      parseInt(pokedexIdParam),
    );
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Deleted succefully',
      deletePoke,
    });
  }
}

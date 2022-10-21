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
import { pokemonsFirstGen } from './arrayPokes';
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
    const pokemon = await this.pokemonsServices.getPokemon(pokedexIdParam);
    if (!pokemon) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Searched Pokemon is :',
      pokemon,
    });
  }

  @Get('/all/:pokedexIdParam')
  async getPokemonsByName(
    @Res() res,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const pokemon = await this.pokemonsServices.getPokemonByName(
      parseInt(pokedexIdParam),
    );
    if (!pokemon) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Searched Pokemons is :',
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

  @Put('/update/all/:pokedexIdParam')
  async updatePokemonByPokedex(
    @Res() res,
    @Body() createPokemonDTO: CreatePokemonDTO,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const updatePoke = await this.pokemonsServices.updatePokemonByPokedex(
      createPokemonDTO,
      parseInt(pokedexIdParam),
    );
    if (!updatePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Edited Succefully',
      updatePoke,
    });
  }
  @Put('/update/:pokedexIdParam')
  async updatePokemonById(
    @Res() res,
    @Body() createPokemonDTO: CreatePokemonDTO,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const updatePoke = await this.pokemonsServices.updatePokemonById(
      createPokemonDTO,
      pokedexIdParam,
    );
    if (!updatePoke) throw new NotFoundException('Pokemon Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Edited Succefully',
      updatePoke,
    });
  }

  @Delete('/delete/:pokedexIdParam')
  async deletePokemonById(
    @Res() res,
    @Param('pokedexIdParam') pokedexIdParam: string,
  ) {
    const deletePoke = await this.pokemonsServices.deletePokemonById(
      pokedexIdParam,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Deleted succefully',
      deletePoke,
    });
  }

  @Post('/createFirstGen')
  async createFirstGen(@Res() res) {
    const createPoke = await this.pokemonsServices.createFirstGenPokemons(
      pokemonsFirstGen,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Pokemon Succefully Created',
      createPoke,
    });
  }
}

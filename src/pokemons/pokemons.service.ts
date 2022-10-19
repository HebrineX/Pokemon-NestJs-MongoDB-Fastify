import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './interfaces/pokemon.interface';
import { CreatePokemonDTO } from './dto/pokemon.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async getPokemons(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async getPokemon(pokedexIdParam: number): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOne({
      pokedexId: pokedexIdParam,
    });
    return pokemon;
  }

  async createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<Pokemon> {
    const newPokimon = new this.pokemonModel(createPokemonDTO);
    return await newPokimon.save();
  }

  async updatePokemon(
    createPokemonDTO: CreatePokemonDTO,
    pokedexIdParam: number,
  ): Promise<Pokemon> {
    const updatePokimon = await this.pokemonModel.findOneAndUpdate(
      {
        pokedexId: pokedexIdParam,
      },
      createPokemonDTO,
      { new: true },
    );
    return updatePokimon;
  }

  async deletePokemon(pokedexIdParam: number): Promise<Pokemon> {
    const deletePokimon = await this.pokemonModel.findOneAndDelete({
      pokedexId: pokedexIdParam,
    });
    return deletePokimon;
  }

  async createFirstGenPokemons(pokemonsFirstGen): Promise<Pokemon[]> {
    //   return await this.pokemonModel.create();
    const pokeArray = [];
    await pokemonsFirstGen.forEach((pokemon: CreatePokemonDTO) => {
      const createPokemonDTO: CreatePokemonDTO = {
        pokedexId: pokemon.pokedexId,
        name: pokemon.name,
        type: pokemon.type,
        imageURL: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
          pokemon.pokedexId < 100
            ? pokemon.pokedexId < 10
              ? '00' + pokemon.pokedexId
              : '0' + pokemon.pokedexId
            : pokemon.pokedexId
        }.png`,
      };
      pokeArray.push(createPokemonDTO);
    });
    return await this.pokemonModel.create(pokeArray);
  }
}

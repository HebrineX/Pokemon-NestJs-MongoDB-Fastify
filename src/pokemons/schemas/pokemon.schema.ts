import { Schema } from 'mongoose';

export const PokemonSchema = new Schema({
  name: { type: String, required: true },
  type: [String],
  imageURL: String,
  pokedexId: Number,
});

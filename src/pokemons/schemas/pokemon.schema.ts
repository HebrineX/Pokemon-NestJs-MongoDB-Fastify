import { Schema } from 'mongoose';

export const PokemonSchema = new Schema({
  name: { type: String, required: true },
  alias: { type: String, required: false },
  type: { type: [String], required: true },
  imageURL: { type: String, required: true },
  pokedexId: { type: Number, required: true },
  level: { type: Number, default: 1, require: false },
  experience: { type: Number, default: 0, require: false },
});

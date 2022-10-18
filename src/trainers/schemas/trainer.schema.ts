import { Schema } from 'mongoose';

export const TrainerSchema = new Schema({
  name: { type: String, required: true },
  medalls: [String],
  team: [String],
  pokeballs: { type: Number, default: 10 },
  pokedexCompleted: [Number],
});

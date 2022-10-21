import { Schema } from 'mongoose';

export const TrainerSchema = new Schema({
  name: { type: String, required: true },
  medalls: { type: [String], default: [], required: true },
  team: { type: [String], default: [], required: true },
  pokeballs: { type: Number, default: 10 },
  pokedexCompleted: { type: [Number], default: [], required: true },
  pokemonTrunk: { type: [String], default: [], required: true },
});

import { Document } from 'mongoose';

export interface Trainer extends Document {
  readonly name: string;
  readonly medalls: string[];
  readonly team: string[];
  readonly pokeballs: number;
  readonly pokedexCompleted: number[];
}

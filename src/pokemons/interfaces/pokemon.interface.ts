import { Document } from 'mongoose';
export interface Pokemon extends Document {
  readonly name: string;
  readonly type: string[];
  readonly imageURL: string;
  readonly pokedexId: number;
}

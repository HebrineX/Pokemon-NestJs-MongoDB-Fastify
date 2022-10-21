import { Document } from 'mongoose';

export interface Gym extends Document {
  readonly city: string;
  readonly typeMedall: string;
  readonly leader: string;
  readonly imageMedall: string;
  readonly recruits: string[];
}

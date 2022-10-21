import { Schema } from 'mongoose';

export const GymSchema = new Schema({
  city: { type: String, required: true },
  typeMedall: { type: String, required: false },
  leader: { type: String, required: true },
  imageMedall: { type: String, required: true },
  recruits: { type: [String], required: true },
});

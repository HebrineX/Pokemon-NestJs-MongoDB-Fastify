import { CreateGymDTO } from 'src/gyms/dto/gym.dto';

export const mockGymDTOStub = (): CreateGymDTO => {
  return {
    city: 'Viridian City',
    typeMedall: 'Ground-type',
    leader: ' Giovanni',
    imageMedall:
      'https://images.wikidexcdn.net/mwuploads/wikidex/1/16/latest/20180812035006/Medalla_Tierra.png',
    recruits: ['Jr. Trainer Male', 'Sailor', 'Gentelman'],
  };
};

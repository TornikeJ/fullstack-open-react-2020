export interface PatientsEntry {
    "id":string;
    "name":string;
    "ssn": string,
    "dateOfBirth":string;
    "gender":string;
    "occupation":string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientsEntry = Omit<PatientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
  }
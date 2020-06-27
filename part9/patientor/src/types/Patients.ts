import { Entry } from "./Entry";

export interface PatientsEntry {
    "id":string;
    "name":string;
    "ssn": string,
    "dateOfBirth":string;
    "gender":string;
    "occupation":string;
    "entries"?:Entry[]
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'|'entries'>;

export type NewPatientsEntry = Omit<PatientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
}


export type PublicPatient = Omit<PatientsEntry, 'ssn' | 'entries' >
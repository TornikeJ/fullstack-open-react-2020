export interface PatientsEntry {
    "id":String;
    "name":String;
    "ssn": String,
    "dateOfBirth":String;
    "gender":String;
    "occupation":String;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

import { NonSensitivePatientsEntry, PatientsEntry, NewPatientsEntry } from '../types/Patients';
import patientsData from '../data/patients';
import { Entry } from '../types/Entry';

const uniqid = require('uniqid');

const getEntries = (): Array<NonSensitivePatientsEntry> => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientsEntry): PatientsEntry => {
  const newPatientsEntry = {
    id: uniqid(),
    ...entry
  };

  patientsData.push(newPatientsEntry);

  return newPatientsEntry;
};

const addEntry = (patientId:string, entry: Entry): Entry => {
  const patient = patientsData.find(d => d.id === patientId);
  const newEntry:Entry = {
    ...entry,
    id: uniqid()
  }
  patient?.entries?.push(newEntry);
  return newEntry;
}

const getPatient = (id: string): PatientsEntry | undefined => {
  const patient = patientsData.find(d => d.id === id);
  return patient;
}


// const findById = (id: string): PatientsEntry | undefined => {
//   const entry = patientsData.find(d => d.id === id);
//   let entryWithEntries: PatientsEntry
//   if (entry) {
//     entryWithEntries = { ...entry, entry.entries?}
//     entryWithEntries.entries = []
//     if (!entry.entries) {
//       entry.entries =
//     }
//   }
//   return entry;
// };

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  // findById,
  getPatient,
  addEntry
};
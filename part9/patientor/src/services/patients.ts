import { NonSensitivePatientsEntry, PatientsEntry, NewPatientsEntry } from '../types/Patients';
import patientsData from '../data/patients.json';

const uniqid = require('uniqid');

const getEntries = (): Array<PatientsEntry> => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatientsEntry): PatientsEntry => {
  const newPatientsEntry = {
    id: uniqid(),
    ...entry
  }

  patientsData.push(newPatientsEntry);

  return newPatientsEntry
};

const findById = (id: string): PatientsEntry | undefined => {
  const entry = patientsData.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};
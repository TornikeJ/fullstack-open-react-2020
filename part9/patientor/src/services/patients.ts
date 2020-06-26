import { NonSensitivePatientsEntry, PatientsEntry } from '../types/Patients';
import patientsData from '../data/patients.json'

const getEntries = () : Array<PatientsEntry> => {
  return patientsData;
};

const getNonSensitiveEntries = () : NonSensitivePatientsEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
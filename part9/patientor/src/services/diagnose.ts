import diaryData from '../data/diagnoses.json'

import { DiagnoseEntry } from '../types/Diagnose'

const diagnoses : Array<DiagnoseEntry> = diaryData as Array<DiagnoseEntry>

const getEntries = () : Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
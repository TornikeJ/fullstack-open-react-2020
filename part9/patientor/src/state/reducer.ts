import { State } from "./state";
// import { Patient } from "../types";
import { PatientsEntry } from '../types/Patients';
import { Entry } from "../types/Entry";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: PatientsEntry[];
    }
  | {
      type: "ADD_PATIENT";
      payload: PatientsEntry;
    }
  | {
      type: "SET_PATIENT";
      payload: PatientsEntry;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patient:PatientsEntry
        entry:Entry;
      }
    };

export const setPatientList = (patientList:PatientsEntry[]) =>{
  const action : Action ={
    type:"SET_PATIENT_LIST",
    payload:patientList
  }
  return action
}

export const setPatient = (patient:PatientsEntry) =>{
  const action : Action ={
    type:"SET_PATIENT",
    payload:patient
  }
  return action
}

export const addPatient = (patient:PatientsEntry) =>{
  const action : Action ={
    type:"ADD_PATIENT",
    payload:patient
  }
  return action
}

export const addEntry = (patient:PatientsEntry,entry:Entry) =>{
  const action : Action ={
    type:"ADD_ENTRY",
    payload:{
      entry,
      patient
    }
  }
  return action
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {  
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient:PatientsEntry={...action.payload.patient}
      let updatedEntries : Entry[]
      if(patient.entries){
        updatedEntries = [...patient.entries,action.payload.entry]
      } else{
        updatedEntries = [action.payload.entry]
      }
      const updatedPatient : PatientsEntry = {...patient, entries:[...updatedEntries]}
      return {
        ...state,
        patient: {
          ...state.patient,
          [patient.id]:updatedPatient
        }
      };
    default:
      return state;
  }
};

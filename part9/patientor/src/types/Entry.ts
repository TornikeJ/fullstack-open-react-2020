import { DiagnoseEntry } from './Diagnose';

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthcareEntry  extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName:string,
    sickLeave?: {
        startDate: string,
        endDate: string
    },
}

export type newEntry = Omit<Entry,'healthCheckRating'>

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;
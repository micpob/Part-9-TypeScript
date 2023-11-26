// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender { 
  Male ='male', 
  Female = 'female', 
  Other = 'other' 
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type Discharge = {
  date: string,
  criteria: string
}

export type SickLeave = { 
  startDate: string, 
  endDate: string 
}
  

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}
/* interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string, endDate: string };
} */

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
/* interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
} */

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type BaseEntryWithoutId = UnionOmit<BaseEntry, 'id'>;
export type HospitalEntryWithoutId = UnionOmit<HospitalEntry, 'id'>;
export type OccupationalHealthcareEntryWithoutId = UnionOmit<OccupationalHealthcareEntry, 'id'>;
export type HealthCheckEntryWithoutId = UnionOmit<HealthCheckEntry, 'id'>;


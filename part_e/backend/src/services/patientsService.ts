import patientsData from '../../data/patients-full.ts';
import { Patient, NewPatientEntry, NonSensitivePatient } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const patients : Patient[] = patientsData;

const getPatients = () : NonSensitivePatient[] => {
  return patients.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
  });
};

const getPatient = (id: string) : Patient => {
    const result = patients.find(patient => patient.id === id)
    if (typeof result == 'undefined') {
      throw new Error("Unexpected error: Missing patient");
    } else {
      return result
    }
};

const AddPatient = (newEntry : NewPatientEntry) : Patient => {

const uniqueId = uuidv4();

  const newPatient = { 
    id: uniqueId,
    ...newEntry
   };

   patients.push(newPatient);
   return newPatient;
};

export default {
  getPatients,
  getPatient,
  AddPatient
};
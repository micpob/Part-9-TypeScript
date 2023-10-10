import { Patient, NewPatientEntry, noSsnPatient } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const patients : Patient[] = patientsData;

const getPatients = () : noSsnPatient[] => {
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
  AddPatient
};
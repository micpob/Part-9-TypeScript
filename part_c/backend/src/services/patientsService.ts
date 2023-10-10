import patientsData from '../../data/patients.ts'
import { noSsnPatient } from '../types.ts';

const patients: noSsnPatient[] = patientsData;

const getPatients = (): noSsnPatient[] => {
  return patients.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    }
  });
};

const AddPatient = () => {
  return null;
};

export default {
  getPatients,
  AddPatient
};
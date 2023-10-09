import diagnosesData from '../../data/diagnoses.ts'
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const AddDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  AddDiagnosis
};
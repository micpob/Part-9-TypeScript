import { NewPatientEntry, Gender, Diagnosis, Discharge, SickLeave, BaseEntryWithoutId, EntryWithoutId, HealthCheckEntryWithoutId, HospitalEntryWithoutId, OccupationalHealthcareEntryWithoutId, HealthCheckRating } from './types';

const toNewPatientEntry = (object : unknown): NewPatientEntry => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
    return gender;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {

    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
  
    return newEntry;

  }

  throw new Error('Incorrect data: some fields are missing');
 
};

const toNewEntry = (object : unknown): EntryWithoutId => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseType = (type: unknown): string => {
    if (isString(type) && type === 'HealthCheck' || type === 'OccupationalHealthcare' || type === 'Hospital') {
      return type;
    } else {
      throw new Error('Incorrect or missing type');
    }
  };

  const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
      throw new Error('Incorrect or missing description');
    }
    return description;
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
    }
    return specialist;
  };

  const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

  

  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {

    const ObjectType : string = parseType(object.type)

    const baseEntry: BaseEntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : []
    }

    

    switch (ObjectType) {
      case 'Hospital':
        const newHospitalEntry: HospitalEntryWithoutId = toNewHospitalEntry(object, baseEntry)
        return newHospitalEntry
        break;
      case 'OccupationalHealthcare':
        const newOccupationalHealthcareEntry: OccupationalHealthcareEntryWithoutId = toNewOccupationalHealthcareEntry(object, baseEntry)
        return newOccupationalHealthcareEntry
        break;
      case 'HealthCheck':
        const newHealthCheckEntry: HealthCheckEntryWithoutId = toNewHealthCheckEntry(object, baseEntry)
        return newHealthCheckEntry
        break;
    
      default:
        throw new Error('Entry is missing type');
    }

  }

  throw new Error('Incorrect data: some fields are missing');
 
};

const toNewHealthCheckEntry = (object : object, baseEntry : BaseEntryWithoutId): HealthCheckEntryWithoutId => {

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (typeof healthCheckRating !== 'number' || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing healthCheckRating');
    }
    return healthCheckRating;
  };

  if ('healthCheckRating' in object && 'type' in object) {
    const newHealthCheckEntry: HealthCheckEntryWithoutId = {...baseEntry, type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating)}
    return newHealthCheckEntry

  }

  throw new Error('Incorrect data: some fields are missing');
  
}

const toNewOccupationalHealthcareEntry = (object : object, baseEntry : BaseEntryWithoutId): OccupationalHealthcareEntryWithoutId => {

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseEeployerName = (employerName: unknown): string => {
    if (!isString(employerName)) {
      throw new Error('Incorrect or missing employerName');
    }
    return employerName;
  }

  const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
      throw new Error('Incorrect or missing SickLeave');
    } 

    const sickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    }
    return sickLeave
  };

  if ('type' in object && 'employerName' in object) {
    const newOccupationalHealthcareEntry: OccupationalHealthcareEntryWithoutId = {...baseEntry, type: 'OccupationalHealthcare', employerName: parseEeployerName(object.employerName)}
    if ('sickLeave' in object) {
      newOccupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave)
    }
    return newOccupationalHealthcareEntry
  }

  throw new Error('Incorrect data: some fields are missing');
  
}

const toNewHospitalEntry = (object : object, baseEntry : BaseEntryWithoutId): HospitalEntryWithoutId => {
  
  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {
      throw new Error('Incorrect or missing criteria');
    }
    return criteria;
  }

  const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
      throw new Error('Incorrect or missing Discharge');
    } 

    const discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria)
    }
    return discharge
  };

  if ('discharge' in object && 'type' in object) {
    const newHospitalEntry: HospitalEntryWithoutId = {...baseEntry, type: 'Hospital', discharge: parseDischarge(object.discharge)}
    return newHospitalEntry

  }

  throw new Error('Incorrect data: some fields are missing');
  
}

export {toNewPatientEntry, toNewEntry};
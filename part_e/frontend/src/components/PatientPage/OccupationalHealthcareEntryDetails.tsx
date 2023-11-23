import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import { Typography } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[]
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryDetails = ({diagnoses, entry} : Props ) => {
  
  return (
    <div>
      { 
        entry.diagnosisCodes && 
        <ul>
          {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
        </ul>
      }
      {
        entry.sickLeave &&
        <>
          <Typography><b>Sick leave:</b></Typography>
          <ul>
            <li>Start: {entry.sickLeave.startDate}</li>
            <li>End: {entry.sickLeave.endDate}</li>
          </ul>
        </>
      }
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;

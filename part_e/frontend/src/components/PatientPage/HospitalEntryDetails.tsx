import { HospitalEntry, Diagnosis } from "../../types";
import { Typography } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[]
  entry: HospitalEntry
}

const HospitalEntryDetails = ({diagnoses, entry} : Props ) => {

  return (
    <div>
      { entry.diagnosisCodes && 
          <ul>
            {entry.diagnosisCodes.map(code => <li key={code} >{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
          </ul>   
      }
      <Typography><b>Discharge:</b> {entry.discharge.date} - {entry.discharge.criteria} </Typography>
    </div>
  );
};

export default HospitalEntryDetails;

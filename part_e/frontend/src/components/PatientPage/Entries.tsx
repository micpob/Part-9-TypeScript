import { Entry, Diagnosis } from "../../types";
import { Typography } from '@mui/material';

interface Props {
  diagnoses: Diagnosis[]
  entries: Entry[]
}

const Entries = ({diagnoses, entries} : Props ) => {

  const getDiagnosisName = (diagnosisCode : string) => diagnoses.find(diagnosis => diagnosis.code === diagnosisCode)?.name;
  
  return (
    <div className="entries">
      {
        entries.map(entry => {
          return (
            <div>
            <Typography><b>{entry.date}</b> {entry.description}</Typography>
            { entry.diagnosisCodes && 
              
              <ul>
                {entry.diagnosisCodes.map(code => <li>{code} {getDiagnosisName(code)}</li>)}
              </ul>
            }
          </div>

          );
        }
          
        )
        }
    </div>
  );
};

export default Entries;

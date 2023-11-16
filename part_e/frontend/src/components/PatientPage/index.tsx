import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types";

interface Props {
  patient? : Patient
}

const PatientPage = ({patient} : Props ) => {

  return (
    <div className="App">
      {
        patient ?
        <div> 
          <Typography style={{marginTop: 20, marginBottom: 10}} variant="h4" fontWeight={600}>{patient.name} {patient.gender === 'male' ? <MaleIcon></MaleIcon> : patient.gender === 'female' ? <FemaleIcon></FemaleIcon> : <TransgenderIcon></TransgenderIcon> } </Typography>
          <Typography><b>Date of birth:</b> {patient.dateOfBirth}</Typography>
          <Typography><b>Occupation:</b> {patient.occupation}</Typography>
        </div>

        :

        <Typography variant="h3" color="red">
          Error: patient not found.
        </Typography>


      }
    </div>
  );
};

export default PatientPage;

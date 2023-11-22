import { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "../../services/patients";
import { apiBaseUrl } from "../../constants";
import axios from "axios";
import { Patient, Diagnosis } from "../../types";
import Entries from "./Entries";

interface Props {
  patientId? : string
  diagnoses: Diagnosis[]
}

const PatientPage = ({patientId, diagnoses} : Props ) => {

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      if (typeof patientId == 'undefined') {
        return null;
      } else {
        const patient =  await patientService.getPatient(patientId);
        setPatient(patient);
      }
      
    };
    void fetchPatient();
  }, []);
  
  return (
    <div className="App">
      {
        patient ?
        <div> 
          <Typography style={{marginTop: 20, marginBottom: 10}} variant="h4" fontWeight={600}>{patient.name} {patient.gender === 'male' ? <MaleIcon></MaleIcon> : patient.gender === 'female' ? <FemaleIcon></FemaleIcon> : <TransgenderIcon></TransgenderIcon> } </Typography>
          <Typography><b>Date of birth:</b> {patient.dateOfBirth}</Typography>
          <Typography><b>SSN:</b> {patient.ssn}</Typography>
          <Typography><b>Occupation:</b> {patient.occupation}</Typography>
          <div className="entries">
          <Typography style={{marginTop: 20, marginBottom: 10}} variant="h5" fontWeight={600}>Entries</Typography>
          {patient.entries.length > 0 ? 
            <Entries diagnoses={diagnoses} entries={patient.entries} ></Entries>            
          : 
            <Typography>No entries for this patient</Typography> 
          }
          </div>
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

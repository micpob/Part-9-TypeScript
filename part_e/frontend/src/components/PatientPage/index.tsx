import { useState, useEffect } from "react";
import { Typography, Button } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "../../services/patients";
import entryService from "../../services/entries";
import { apiBaseUrl } from "../../constants";
import axios from "axios";
import { EntryFormValues, Patient, Diagnosis } from "../../types";
import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";
interface Props {
  patientId? : string
  diagnoses: Diagnosis[]
}

const PatientPage = ({patientId, diagnoses} : Props ) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  
  if (typeof patientId == 'undefined') {
    return null;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newEntry = await entryService.create(values, patientId);
      patient?.entries.push(newEntry);
      //setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
    
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const patient =  await patientService.getPatient(patientId);
      setPatient(patient);
    };
    void fetchPatient();
  }, [patient]);
  
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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            setError={setError}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
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

import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { Diagnosis } from "./types";
import diagnosisService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const match = useMatch('/patients/:id');
  const patientId = match ? match.params.id : 'Error: patient ID does not exist';
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
          <Routes>
            <Route path="/patients/:id" element={<PatientPage patientId={patientId} diagnoses={diagnoses} />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;

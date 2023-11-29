import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Input } from '@mui/material';
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  setError: (error : string) => void
}

const AddEntryForm = ({ onCancel, onSubmit, setError }: Props) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [entryType, setEntryType] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDschargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setEntryType(value);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if ( typeof event.target.value === 'number') {
      setHealthCheckRating(event.target.value);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const newValue = typeof event.target.value === "string" ? [event.target.value] : event.target.value;
      setDiagnosisCodes(newValue);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryType.length < 1) return setError('Please choose a entry type');
    switch (entryType) {
      case 'HealthCheck':
        onSubmit({
          description,
          specialist,
          date,
          diagnosisCodes,
          type: 'HealthCheck',
          healthCheckRating
        });  
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          description,
          specialist,
          date,
          diagnosisCodes,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd }
        }); 
        break;
      case 'Hospital':
        onSubmit({
          description,
          specialist,
          date,
          diagnosisCodes,
          type: 'Hospital',
          discharge: {date: dischargeDate, criteria: dischargeCriteria }
        }); 
        break;
    
      default:
        break;
    }

  };

  return (
    <div>
      <form onSubmit={addEntry}>
      <InputLabel style={{ marginTop: 5 }}>Type:</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
          <MenuItem key={'HealthCheck'} value={'HealthCheck'}>HealthCheck</MenuItem>
          <MenuItem key={'OccupationalHealthcare'} value={'OccupationalHealthcare'}>Occupational Healthcare</MenuItem>
          <MenuItem key={'Hospital'} value={'Hospital'}>Hospital</MenuItem>
        </Select>
        {
          entryType === 'HealthCheck' && 
          <div>
            <InputLabel style={{ marginTop: 20 }}>Healtcheck rating</InputLabel>
            <Select
            label="Healtcheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={onHealthCheckRatingChange}
            >
              <MenuItem key={0} value={0}>Healthy</MenuItem>
              <MenuItem key={1} value={1}>LowRisk</MenuItem>
              <MenuItem key={2} value={2}>HighRisk</MenuItem>
              <MenuItem key={3} value={3}>CriticalRisk</MenuItem>
            </Select>
          </div>
        }

        {
          entryType === 'OccupationalHealthcare' && 
          <div>
             <TextField
            label="Employer name"
            fullWidth 
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            />
            <div style={{ marginTop: 10}}>
              <p>Sickleave:</p>
              <InputLabel style={{ marginTop: 5, marginLeft: 5 }}>start</InputLabel>
              <Input
              type="date"
              fullWidth 
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <InputLabel style={{ marginTop: 5, marginLeft: 5 }}>end</InputLabel>
            <Input
              type="date"
              fullWidth 
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
            </div>
            
          </div>
        }
        {
          entryType === 'Hospital' && 
          <div>
            <InputLabel style={{ marginTop: 5, marginLeft: 5 }}>Discharge date:</InputLabel>
            <Input
            type="date"
            fullWidth 
            value={dischargeDate}
            onChange={({ target }) => setDschargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth 
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        }
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Date:</InputLabel>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel>Diagnosis codes:</InputLabel>
        <Select
          style={{ marginBottom: 5 }}
          label="Diagnosis codes"
          fullWidth
          multiple
          onChange={(event: SelectChangeEvent<string[]>) => onDiagnosisCodesChange(event)}
          value={diagnosisCodes}
        >
          <MenuItem key={'M24.2'} value={'M24.2'}>Disorder of ligament</MenuItem>
          <MenuItem key={'M51.2'} value={'M51.2'}>Other specified intervertebral disc displacement</MenuItem>
          <MenuItem key={'S03.5'} value={'S03.5'}>Sprain and strain of joints and ligaments of other and unspecified parts of head</MenuItem>
          <MenuItem key={'J10.1'} value={'J10.1'}>Influenza with other respiratory manifestations, other influenza virus codeentified</MenuItem>
          <MenuItem key={'J06.9'} value={'J06.9'}>Acute upper respiratory infection, unspecified</MenuItem>
          <MenuItem key={'Z57.1'} value={'Z57.1'}>Occupational exposure to radiation</MenuItem>
          <MenuItem key={'N30.0'} value={'N30.0'}>Acute cystitis</MenuItem>
          <MenuItem key={'H54.7'} value={'H54.7'}>Unspecified visual loss</MenuItem>
          <MenuItem key={'J03.0'} value={'J03.0'}>Streptococcal tonsillitis</MenuItem>
          <MenuItem key={'L60.1'} value={'L60.1'}>Onycholysis</MenuItem>
          <MenuItem key={'Z74.3'} value={'Z74.3'}>Need for continuous supervision</MenuItem>
          <MenuItem key={'L20'} value={'L20'}>Atopic dermatitis</MenuItem>
          <MenuItem key={'F43.2'} value={'F43.2'}>Adjustment disorders</MenuItem>
          <MenuItem key={'S62.5'} value={'S62.5'}>Fracture of thumb</MenuItem>
          <MenuItem key={'H35.29'} value={'H35.29'}>Other proliferative retinopathy</MenuItem>
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
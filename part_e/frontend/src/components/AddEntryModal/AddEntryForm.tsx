import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
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

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
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
      <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
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
          <TextField
            label="Healthcheck rating"
            fullWidth 
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
          />
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
            <TextField
              label="Sick leave start"
              fullWidth 
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              fullWidth 
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        }
        {
          entryType === 'Hospital' && 
          <div>
             <TextField
            label="Discharge date"
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
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="DiagnosisCodes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes((target.value).split(','))}
        />

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
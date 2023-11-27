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

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setEntryType(value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('addEntry');
    onSubmit({
      description,
      specialist,
      date,
      diagnosisCodes,
      type: 'HealthCheck',
      healthCheckRating
    });
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
          /* onChange={({ target }) => onDiagnosisCodesChange(target)} */
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
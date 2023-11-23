import { Entry, Diagnosis } from "../../types";
import {assertNever} from "assert-never";
import { Typography } from '@mui/material';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
interface Props {
  diagnoses: Diagnosis[]
  entries: Entry[]
}

const Entries = ({diagnoses, entries} : Props ) => {

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} ></HospitalEntryDetails>;
        break;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} ></OccupationalHealthcareEntryDetails>;
        break;
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} ></HealthCheckEntryDetails>;
        break;
      default:
        return assertNever(entry);
    }
  };

  const EntryTypeIcon: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospitalIcon></LocalHospitalIcon>;
        break;
      case 'OccupationalHealthcare':
        return <span><WorkIcon></WorkIcon>{entry.employerName}</span>;
        break;
      case 'HealthCheck':
        return <TroubleshootIcon></TroubleshootIcon>;
        break;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div className="entries">
      {
        entries.map(entry => 
          <div key={entry.id} style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: 10, marginBottom: 8, borderRadius: 4}}> 
            <Typography><b>{entry.date}</b> <EntryTypeIcon entry={entry}></EntryTypeIcon></Typography>
            <Typography>{entry.description}</Typography>
            <EntryDetails entry={entry}></EntryDetails>
            <Typography><b>Diagnosis by:</b> {entry.specialist}</Typography>
          </div>
        )
      }
    </div>
  );
};

export default Entries;

import { HealthCheckEntry, Diagnosis } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface Props {
  diagnoses: Diagnosis[]
  entry: HealthCheckEntry
}

const HealthCheckEntryDetails = ({diagnoses, entry} : Props ) => {

  const setHeartColor = ()=> {
    switch (entry.healthCheckRating) {
      case 2:
        return 'error';
        break;
      case 1:
        return 'warning';
        break;
      default:
        return 'success';
        break;
    }
  };
  
  return (
    <div>
      { entry.diagnosisCodes && 
        <ul>
          {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>)}
        </ul>
      }
      {entry.healthCheckRating < 2 ?
        <FavoriteIcon color={setHeartColor()} ></FavoriteIcon>
        :
        <HeartBrokenIcon></HeartBrokenIcon>
      }
      
    </div>
  );
};

export default HealthCheckEntryDetails;

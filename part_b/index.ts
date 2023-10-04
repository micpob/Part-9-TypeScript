import express from 'express';
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (typeof req.query.height == 'undefined' || isNotNumber(req.query.height) || typeof req.query.weight == 'undefined' || isNotNumber(req.query.weight)) {
    res.status(404).send({ error: "malformatted parameters" });
  } else {
    const height = Number(req.query.height);    
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);  
    res.send({height: height, weight: weight, bmi: bmi});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyTargetHours : any = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExerciseHours : any = req.body.daily_exercises;

  if (typeof dailyTargetHours == 'undefined' || typeof dailyExerciseHours == 'undefined') {
    res.status(404).send({ error: "parameters missing" });
  } else if (isNotNumber(dailyTargetHours) || dailyExerciseHours.some(isNotNumber)) {
    res.status(404).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(dailyTargetHours, dailyExerciseHours);
    console.log(result);
    res.json(result);
  }  
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
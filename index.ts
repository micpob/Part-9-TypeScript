import express from 'express';
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
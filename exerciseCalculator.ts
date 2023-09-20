import { isNotNumber } from "./utils";

interface ValidValues {
  dailyTargetHours: number;
  dailyExerciseHours: number[];
}

const parseArguments = (args: string[]): ValidValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNotNumber(args[2])) throw new Error('Target hours value must be a number!');

  const exerciseHoursArray = args.slice(3).map((element) => {
      if (isNotNumber(element)) {
        throw new Error('Exercise hours values must be numbers!');
      } else {
       return Number(element)
      }
  })

  return {
    dailyTargetHours: Number(args[2]),
    dailyExerciseHours: exerciseHoursArray
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyTargetHours: number, dailyExerciseHours: number[]): Result => {

  const trainingDays = dailyExerciseHours.filter(v => v > 0)
  
  const averageDailyExerciseTime = dailyExerciseHours.reduce( ( p, c ) => p + c, 0 ) / dailyExerciseHours.length;

  let rating
  let ratingDescription

  switch (true) {
    case (averageDailyExerciseTime < (dailyTargetHours * 0.8)):
      rating = 1
      ratingDescription = 'Bad'
      break;
    case (averageDailyExerciseTime > (dailyTargetHours * 1.2)):
      rating = 3
      ratingDescription = 'Excellent'
      break;
    default:
      rating = 2
      ratingDescription = 'Good'
      break;
  }

const result = {
  periodLength: dailyExerciseHours.length,
  trainingDays: trainingDays.length,
  success: averageDailyExerciseTime >= dailyTargetHours,
  rating: rating,
  ratingDescription: ratingDescription,
  target: dailyTargetHours,
  average: averageDailyExerciseTime
}  

return result
  
}

try {
  const { dailyTargetHours, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyTargetHours, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
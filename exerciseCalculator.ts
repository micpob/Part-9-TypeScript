interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: number[], dailyTargetHours: number): Result => {

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
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
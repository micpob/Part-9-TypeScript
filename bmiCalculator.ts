import { isNotNumber } from "./utils";
interface ValidValues {
  height: number;
  weigth: number;
}

const parseArguments = (args: string[]): ValidValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weigth: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weigth: number) => {

  const bmi = weigth / ((height / 100) ** 2);

  switch (true) {
    case (bmi < 16):
      return'Underweight (Severe thinness)'
      break;
    case (bmi <= 16.9):
      return'Underweight (Moderate thinness)'
      break;
    case (bmi <= 18.4):
      return'Underweight (Mild thinness)'
      break;
    case (bmi <= 24.9):
      return 'Normal (healthy weight)'
      break;
    case (bmi <= 29.9):
      return'Overweight (Pre-obese)'
      break;
    case (bmi <= 34.9):
      return'Obese (Class I)'
      break;
    case (bmi <= 39.9):
      return'Obese (Class II)'
      break;
    case (bmi > 40):
      return'Obese (Class III)'
      break;
    default:
      break;
  }
  
}

try {
  const { height, weigth } = parseArguments(process.argv);
  console.log(calculateBmi(height, weigth));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export {calculateBmi};

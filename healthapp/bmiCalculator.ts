interface BMIvalues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BMIvalues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height,
    weight,
  };
};

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error(`height and weight must be greater than 0`);
  }

  const bmi =  weight / (height / 100) ** 2;

  if (bmi >= 40) {
    return 'Obese (Class III)';
  } else if (bmi >= 35) {
    return 'Obese (Class II)';
  } else if (bmi >= 30) {
    return 'Obese (Class I)';
  } else if (bmi >= 25) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 18.5) {
    return 'Normal range';
  } else if (bmi >= 17) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 16) {
    return 'Underweight (Moderate thinness)';
  } else {
    return 'Underweight (Severe thinness)';
  }
};

export {calculateBmi};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

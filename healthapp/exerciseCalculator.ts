type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValues {
  target: number
  hours: number[]
}

const parseArguments = (args: string[]): ExerciseValues => {
  const [, , first, ...rest] = args;
  const target = Number(first);
  if (isNaN(target)) {
    throw new Error('target value is not number');
  }

  const hours: number[] = [];
  for (let i = 0; i < rest.length; i++) {
    if (isNaN(Number(rest[i]))) {
      throw new Error('some of hours value is not number');
    }
    hours.push(Number(rest[i]));
  }

  return {
    target,
    hours,
  };
};

const calculateExercises = (args: number[], target: number): Result => {
  if (!args.length) {
    throw new Error(`an empty array is not allowed`);
  }

  if (args.some((hours) => !Number.isFinite(hours) || hours < 0)) {
    throw new Error('exercise hours must be non-negative numbers');
  }

  if (!Number.isFinite(target) || target <= 0) {
    throw new Error('target hours must be a number that is greater than 0');
  }

  const periodLength = args.length;
  const trainingDays = args.filter((a) => a > 0).length;
  const average = args.reduce((sum, hrs) => sum + hrs, 0) / periodLength;
  const success = average >= target;
  let rating: Rating;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'no good';
  }

  return {
    target,
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription
  };
};

export { calculateExercises };

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
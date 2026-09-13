import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const { height, weight } = request.query;

  const h = Number(height);
  const w = Number(weight);

  if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
    response.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const bmi = calculateBmi(h, w);

  response.json({
    height: h,
    weight: w,
    bmi,
  });
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = request.body;

  if (daily_exercises === undefined || target === undefined) {
    response.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => isNaN(Number(value))) ||
    isNaN(Number(target))) {
    response.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  const results = calculateExercises(daily_exercises.map(Number), Number(target));

  response.json(results);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
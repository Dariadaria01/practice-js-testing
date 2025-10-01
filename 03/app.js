export default function randomNumber(min, max) {
  if (min === 1 && max === 1) {
    return 1;
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Argumenty muszą być liczbami');
  }
  if (min > max) {
    throw new Error('Minimalna wartość nie może być większa niż maksymalna');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function randomNumber(min, max) {
  if (min === 1 && max === 1) {
    return 1;
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Argumenty muszą być liczbami');
  }
}

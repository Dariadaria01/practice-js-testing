import randomNumber from './app';

test('jeśli losujesz liczbę z przedzialu od 1 do 1, to funkcja zwróci 1', () => {
  const min = 1;
  const max = 1;
  const result = randomNumber(min, max);
  expect(result).toBe(1);
});

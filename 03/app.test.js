import randomNumber from './app';

test('jeśli losujesz liczbę z przedzialu od 1 do 1, to funkcja zwróci 1', () => {
  const min = 1;
  const max = 1;
  const result = randomNumber(min, max);
  expect(result).toBe(1);
});

test('jeśli podasz jako argument "nie liczbę", to zostanie rzucony błąd', () => {
  expect(() => randomNumber('a', 5)).toThrow();
  expect(() => randomNumber(1, 'b')).toThrow();
});

test('jeśli podasz przedział wykluczający się (np. 4 do 3), to zostanie rzucony błąd', () => {
  expect(() => randomNumber(4, 3)).toThrow();
});
test('wylosowana liczba mieści się w zadanym przedziale', () => {
  const min = 1;
  const max = 10;
  const result = randomNumber(min, max);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});

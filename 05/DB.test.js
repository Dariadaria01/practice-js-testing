import DB from './DB';

describe('DB insert()', () => {
  it('dodaje wiersz', async () => {
    const db = new DB();
    const row = await db.insert({ a: 1 });
    expect(row.a).toBe(1);
  });
  it('nadaje automatycznie ID, jeśli nie podano', async () => {
    const db = new DB();
    const row = await db.insert({ a: 2 });
    expect(row).toHaveProperty('id');
    expect(typeof row.id).toBe('number');
  });

  it('odrzuca, jeśli ID nie jest liczbą', async () => {
    const db = new DB();
    await expect(db.insert({ id: 'abc', a: 3 })).rejects.toBe(
      'ID can be only number!'
    );
  });
  it('odrzuca, jeśli ID jest zduplikowane', async () => {
    const db = new DB();
    await db.insert({ id: 1, a: 10 });
    await expect(db.insert({ id: 1, a: 20 })).rejects.toBe(
      "ID can't be duplicated!"
    );
  });

  describe('DB select()', () => {
    it('zwraca wiersz o podanym ID', async () => {
      const db = new DB();
      const row = await db.insert({ a: 1 });
      const selected = await db.select(row.id);
      expect(selected).toEqual(row);
    });

    it('odrzuca, gdy ID nie istnieje', async () => {
      const db = new DB();
      await expect(db.select(999)).rejects.toBe('ID not found');
    });
  });

  describe('DB remove()', () => {
    it('usuwa istniejący wiersz', async () => {
      const db = new DB();
      const row = await db.insert({ a: 1 });
      await expect(db.remove(row.id)).resolves.toBe('Item was remove!');
    });
    it('odrzuca, jeśli wiersz nie istnieje', async () => {
      const db = new DB();
      await expect(db.remove(123)).rejects.toBe('Item not exist!');
    });
  });

  describe('DB update()', () => {
    it('aktualizuje dane w istniejącym wierszu', async () => {
      const db = new DB();
      const row = await db.insert({ a: 1 });
      const updated = await db.update({ id: row.id, a: 999 });
      expect(updated.a).toBe(999);
    });
    it('odrzuca, jeśli ID nie istnieje', async () => {
      const db = new DB();
      await expect(db.update({ id: 123, a: 5 })).rejects.toBe('ID not found!');
    });
    it('odrzuca, jeśli ID nie zostało podane', async () => {
      const db = new DB();
      await expect(db.update({ a: 5 })).rejects.toBe('ID have to be set!');
    });
  });
  describe('DB truncate()', () => {
    it('usuwa wszystkie wiersze', async () => {
      const db = new DB();
      await db.insert({ a: 1 });
      await db.insert({ a: 2 });
      await db.truncate();
      const rows = await db.getRows();
      expect(rows).toEqual([]);
    });
  });
  describe('DB getRows()', () => {
    it('zwraca wszystkie wiersze', async () => {
      const db = new DB();
      const row1 = await db.insert({ a: 1 });
      const row2 = await db.insert({ a: 2 });
      const rows = await db.getRows();
      expect(rows).toEqual([row1, row2]);
    });
  });
});

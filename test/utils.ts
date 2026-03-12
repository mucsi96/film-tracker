import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5460,
  database: 'test',
  user: 'postgres',
  password: 'postgres',
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function cleanupDb() {
  await query('DELETE FROM suggestions');
  await query('DELETE FROM films');
  await query('DELETE FROM favorite_actors');
}

export async function populateDb() {
  await query(`
    INSERT INTO films (title, year, actor1, actor2, score)
    VALUES ('Inception', 2010, 'Leonardo DiCaprio', 'Tom Hardy', 9)
    ON CONFLICT DO NOTHING
  `);
}

export async function cleanupDbRecords() {
  await query('DELETE FROM suggestions');
  await query('DELETE FROM films');
  await query('DELETE FROM favorite_actors');
}

export async function insertFilm(title: string, year: number, actor1: string, actor2: string, score: number) {
  await query('INSERT INTO films (title, year, actor1, actor2, score) VALUES ($1, $2, $3, $4, $5)', [title, year, actor1, actor2, score]);
}

export async function insertFavoriteActor(name: string) {
  await query('INSERT INTO favorite_actors (name) VALUES ($1)', [name]);
}

export async function insertSuggestion(title: string, year: number, reason: string) {
  await query('INSERT INTO suggestions (title, year, reason) VALUES ($1, $2, $3)', [title, year, reason]);
}

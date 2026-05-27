const pool = require('./db');
async function run() {
  const conn = await pool.getConnection();
  try {
    console.log('Removing image_url column from Posts table...');
    await conn.query('ALTER TABLE Posts DROP COLUMN image_url');
    console.log('Successfully removed image_url column.');
  } catch (err) {
    if (err.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
      console.log('image_url column already removed from database.');
    } else {
      console.error('Error removing column:', err.message);
    }
  } finally {
    conn.release();
    process.exit(0);
  }
}
run();

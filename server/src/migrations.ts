import pool from './db.js'

export async function runMigrations() {
  const connection = await pool.getConnection()
  try {
    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    // Create messages table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        threadId VARCHAR(255) NOT NULL,
        senderUsername VARCHAR(255) NOT NULL,
        recipientUsername VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        createdAt BIGINT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    console.log('Database migrations completed successfully.')
  } catch (error) {
    console.error('Database migration failed:', error)
    throw error
  } finally {
    connection.release()
  }
}

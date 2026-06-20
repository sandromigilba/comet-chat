import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'comet_db',
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

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

    console.log('TiDB/MySQL database migrations verified successfully.')
  } catch (error) {
    console.error('Database migration failed:', error)
    throw error
  } finally {
    connection.release()
  }
}

export default pool

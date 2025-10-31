import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

// Configuración de PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'hellhouse_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Evento de error del pool
pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de PostgreSQL', err);
  process.exit(-1);
});

// Función para verificar la conexión
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error al conectar a PostgreSQL:', err.message);
    return false;
  }
};

export default pool;



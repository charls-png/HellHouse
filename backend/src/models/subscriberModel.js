import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const subscriberModel = {
  // Crear nuevo suscriptor
  create: async (email, name = null) => {
    const unsubscribeToken = uuidv4();
    const query = `
      INSERT INTO subscribers (email, name, unsubscribe_token)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    try {
      const result = await pool.query(query, [email, name, unsubscribeToken]);
      return { success: true, data: result.rows[0] };
    } catch (error) {
      if (error.code === '23505') { // Duplicate key
        return { success: false, error: 'Email ya registrado' };
      }
      return { success: false, error: error.message };
    }
  },

  // Obtener suscriptor por email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM subscribers WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  },

  // Obtener todos los suscriptores activos
  findAllActive: async () => {
    const query = 'SELECT * FROM subscribers WHERE is_active = true ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  // Desuscribir por token
  unsubscribeByToken: async (token) => {
    const query = `
      UPDATE subscribers 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP 
      WHERE unsubscribe_token = $1 
      RETURNING *
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
  },

  // Contar suscriptores activos
  countActive: async () => {
    const query = 'SELECT COUNT(*) as count FROM subscribers WHERE is_active = true';
    const result = await pool.query(query);
    return parseInt(result.rows[0].count);
  },

  // Registrar email enviado
  logEmail: async (subscriberId, subject, templateName, status = 'sent', errorMessage = null) => {
    const query = `
      INSERT INTO sent_emails (subscriber_id, subject, template_name, status, error_message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [subscriberId, subject, templateName, status, errorMessage]);
    return result.rows[0];
  }
};

export default subscriberModel;



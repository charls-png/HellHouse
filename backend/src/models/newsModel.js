import pool from '../config/database.js';

export const newsModel = {
  // Obtener todas las noticias publicadas
  findAllPublished: async () => {
    const query = `
      SELECT id, title, content, excerpt, image_url, published_at, created_at
      FROM news 
      WHERE is_published = true 
      ORDER BY published_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Obtener noticia por ID
  findById: async (id) => {
    const query = `
      SELECT * FROM news WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Obtener últimas noticias (limitado)
  findLatest: async (limit = 5) => {
    const query = `
      SELECT id, title, excerpt, image_url, published_at
      FROM news 
      WHERE is_published = true 
      ORDER BY published_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  },

  // Crear noticia (para admin futuro)
  create: async (title, content, excerpt, imageUrl = null) => {
    const query = `
      INSERT INTO news (title, content, excerpt, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [title, content, excerpt, imageUrl]);
    return result.rows[0];
  },

  // Publicar noticia
  publish: async (id) => {
    const query = `
      UPDATE news 
      SET is_published = true, published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
};

export default newsModel;



import express from 'express';
import newsController from '../controllers/newsController.js';

const router = express.Router();

// GET /api/news - Obtener todas las noticias
router.get('/', newsController.getAllNews);

// GET /api/news/latest - Obtener últimas noticias
router.get('/latest', newsController.getLatestNews);

// GET /api/news/:id - Obtener noticia por ID
router.get('/:id', newsController.getNewsById);

export default router;



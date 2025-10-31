import express from 'express';
import subscriberController from '../controllers/subscriberController.js';

const router = express.Router();

// POST /api/subscribers/subscribe - Suscribirse al newsletter
router.post('/subscribe', subscriberController.subscribe);

// GET /api/subscribers/unsubscribe/:token - Desuscribirse
router.get('/unsubscribe/:token', subscriberController.unsubscribe);

// GET /api/subscribers/stats - Estadísticas (para futuro admin)
router.get('/stats', subscriberController.getStats);

export default router;



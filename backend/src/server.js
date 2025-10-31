import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Seguridad
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Hell House API is running...',
    timestamp: new Date().toISOString()
  });
});

// Rutas API
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/news', newsRoutes);

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  // Verificar conexión a la base de datos
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.error('⚠️  No se pudo conectar a la base de datos');
    console.log('💡 Asegúrate de:');
    console.log('   1. PostgreSQL está corriendo');
    console.log('   2. La base de datos existe');
    console.log('   3. Las credenciales en .env son correctas');
    console.log('\n⏳ El servidor continuará sin base de datos...\n');
  }

  app.listen(PORT, () => {
    console.log('\n🏚️  ==========================================');
    console.log('   HELL HOUSE - Backend API');
    console.log('   ==========================================');
    console.log(`   🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`   🌍 URL: http://localhost:${PORT}`);
    console.log(`   📊 Health: http://localhost:${PORT}/health`);
    console.log('   ==========================================\n');
  });
};

startServer();

export default app;



// Middleware para manejar errores globales
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
};

export default { errorHandler, notFound };



# Imagen base de Node.js
FROM node:20-alpine

# Información del contenedor
LABEL maintainer="Hell House Team"
LABEL description="Backend API para Hell House Chronicles"

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
# Usamos npm install en lugar de npm ci para mayor flexibilidad en Docker
RUN npm install --only=production

# Copiar el código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Healthcheck para verificar que el contenedor está funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para iniciar el servidor
CMD ["npm", "start"]


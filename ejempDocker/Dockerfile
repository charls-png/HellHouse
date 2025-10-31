# Imagen base
FROM node:18-alpine

# Información del autor
LABEL maintainer="ian.charles@example.com"
LABEL description="Aplicación Node.js de ejemplo con Dockerfile"

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]

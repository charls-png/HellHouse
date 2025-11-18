# Etapa 1: Build de la aplicación Angular
FROM node:20-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
# Usamos npm install en lugar de npm ci para mayor flexibilidad en Docker
RUN npm install

# Copiar el código fuente
COPY . .

# Build de la aplicación Angular para producción
RUN npm run build -- --configuration production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Información del contenedor
LABEL maintainer="Hell House Team"
LABEL description="Frontend Angular para Hell House Chronicles"

# Copiar los archivos compilados desde la etapa de build
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Nginx se ejecuta automáticamente
CMD ["nginx", "-g", "daemon off;"]


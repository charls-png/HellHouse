# 🐳 Hell House - Guía Docker

Esta guía te ayudará a correr el proyecto Hell House completo usando Docker Desktop.

## 📋 Requisitos Previos

- **Docker Desktop** instalado y corriendo
- **Git** (para clonar el repositorio)
- Al menos **4GB de RAM** libres
- Puertos disponibles: **3000** (backend), **4200** (frontend), **5432** (PostgreSQL)

## 🚀 Inicio Rápido

### ⚡ Modo Desarrollo (Hot-Reload) - RECOMENDADO

Para desarrollo con **hot-reload automático** (los cambios se reflejan sin rebuild):

```bash
# Usar docker-compose.dev.yml
docker-compose -f docker-compose.dev.yml up --build
```

**Ventajas:**
- ✅ Cambios en el código se reflejan **automáticamente** (sin rebuild)
- ✅ Frontend usa `ng serve` (hot-reload de Angular)
- ✅ Backend usa `nodemon` (reinicio automático)
- ✅ Perfecto para desarrollo activo

**Nota:** La primera vez tarda más (instala dependencias), luego es instantáneo.

### 🏭 Modo Producción (Build Optimizado)

Para producción o cuando quieras probar el build final:

```bash
# Usar docker-compose.yml (por defecto)
docker-compose up --build
```

**Ventajas:**
- ✅ Build optimizado de Angular
- ✅ Servido con Nginx (más rápido)
- ✅ Sin dependencias de desarrollo

**Desventaja:** Cada cambio requiere rebuild completo.

---

### Opción 1: Correr desde Docker Desktop (Interfaz Gráfica)

1. **Abre Docker Desktop**

2. **Navega a la carpeta del proyecto** en tu terminal:
   ```bash
   cd C:\Users\ian_h\Integradora
   ```

3. **Crea el archivo .env** (opcional, si no existe usará valores por defecto):
   ```bash
   # En PowerShell
   Copy-Item .env.example .env
   # Edita .env con tus valores personalizados
   ```

4. **En Docker Desktop**:
   - Ve a la pestaña "**Images**"
   - Carga el archivo `docker-compose.yml` del proyecto
   - O simplemente usa el siguiente comando

5. **Inicia los servicios**:
   ```bash
   docker-compose up
   ```

6. **Accede a la aplicación**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

### Opción 2: Correr desde Línea de Comandos

#### Comandos Básicos

```bash
# 1. Construir e iniciar todos los servicios
docker-compose up --build

# 2. Correr en segundo plano (detached mode)
docker-compose up -d

# 3. Ver logs de todos los servicios
docker-compose logs -f

# 4. Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# 5. Detener todos los servicios
docker-compose down

# 6. Detener y eliminar volúmenes (¡CUIDADO! Borra la base de datos)
docker-compose down -v

# 7. Reiniciar un servicio específico
docker-compose restart backend

# 8. Ver estado de los servicios
docker-compose ps
```

## 📦 Estructura de Servicios

El proyecto usa **3 contenedores**:

### 1. **Database (PostgreSQL)**
- **Imagen**: `postgres:16-alpine`
- **Puerto**: 5432
- **Contenedor**: `hellhouse-db`
- **Volumen**: Datos persistentes en `postgres_data`
- **Inicialización**: Ejecuta automáticamente `database/schema.sql`

### 2. **Backend (Node.js + Express)**
- **Imagen**: Construida desde `backend/Dockerfile`
- **Puerto**: 3000
- **Contenedor**: `hellhouse-backend`
- **Dependencias**: Espera a que la base de datos esté lista
- **Health Check**: `/health` endpoint

### 3. **Frontend (Angular + Nginx)**
- **Imagen**: Construida desde `frontend/Dockerfile` (multi-stage)
- **Puerto**: 4200 → 80 (internamente usa Nginx en puerto 80)
- **Contenedor**: `hellhouse-frontend`
- **Dependencias**: Espera al backend
- **Build**: Angular optimizado para producción

## 🔧 Configuración de Variables de Entorno

### Archivo `.env` (raíz del proyecto)

Crea un archivo `.env` en la raíz del proyecto con estas variables:

```env
# Puertos
FRONTEND_PORT=4200
BACKEND_PORT=3000
DB_PORT=5432

# Base de datos
DB_NAME=hellhouse
DB_USER=postgres
DB_PASSWORD=hellhouse2024

# Backend
NODE_ENV=production
FRONTEND_URL=http://localhost:4200

# Email (opcional)
RESEND_API_KEY=tu_api_key_de_resend
```

### Valores por Defecto

Si no creas el archivo `.env`, se usarán estos valores:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- Database: localhost:5432
- DB Name: `hellhouse`
- DB User: `postgres`
- DB Password: `hellhouse2024`

## 🎯 Escenarios Comunes

### Primera Vez Corriendo el Proyecto

```bash
# 1. Construir imágenes e iniciar servicios
docker-compose up --build

# 2. Espera a ver estos mensajes:
#    ✅ Database: "ready to accept connections"
#    ✅ Backend: "Hell House - Backend API running on port 3000"
#    ✅ Frontend: "nginx started"

# 3. Abre el navegador en http://localhost:4200
```

### Desarrollo Local (con cambios en el código)

```bash
# Reconstruir solo el servicio que cambió
docker-compose up --build backend

# O reconstruir todo desde cero
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Ver Logs en Tiempo Real

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Solo database
docker-compose logs -f db
```

### Resetear la Base de Datos

```bash
# ⚠️ ADVERTENCIA: Esto borra TODOS los datos
docker-compose down -v
docker-compose up --build
```

### Ejecutar Comandos Dentro de un Contenedor

```bash
# Acceder al contenedor del backend
docker exec -it hellhouse-backend sh

# Acceder a PostgreSQL
docker exec -it hellhouse-db psql -U postgres -d hellhouse

# Ver archivos del frontend
docker exec -it hellhouse-frontend ls /usr/share/nginx/html
```

## 🐛 Solución de Problemas

### Problema: "Port is already in use"

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solución**:
```bash
# Windows PowerShell - Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F

# O cambia el puerto en .env
BACKEND_PORT=3001
```

### Problema: Backend no conecta a la base de datos

**Solución**:
```bash
# 1. Verifica que la DB esté corriendo
docker-compose ps

# 2. Verifica logs de la DB
docker-compose logs db

# 3. Verifica las variables de entorno
docker exec hellhouse-backend env | grep DB_

# 4. Reinicia los servicios en orden
docker-compose restart db
docker-compose restart backend
```

### Problema: Frontend muestra error 404 en rutas

**Causa**: Nginx no está configurado correctamente para SPA (Single Page Application)

**Solución**: Ya está resuelto en `frontend/nginx.conf` con `try_files $uri $uri/ /index.html;`

### Problema: "Cannot find module" en el backend

**Solución**:
```bash
# Reconstruir la imagen sin cache
docker-compose build --no-cache backend
docker-compose up backend
```

### Problema: Los cambios no se reflejan

**Solución**:
```bash
# Forzar reconstrucción completa
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 📊 Monitoreo y Salud

### Health Checks

Todos los servicios tienen health checks configurados:

```bash
# Ver estado de salud
docker-compose ps

# Deberías ver:
# NAME                 STATUS
# hellhouse-backend    Up (healthy)
# hellhouse-db         Up (healthy)
# hellhouse-frontend   Up (healthy)
```

### Endpoints de Salud

```bash
# Backend
curl http://localhost:3000/health

# Frontend
curl http://localhost:4200/

# Database (desde dentro del contenedor)
docker exec hellhouse-db pg_isready -U postgres
```

## 🎨 Usando Docker Desktop (Interfaz Gráfica)

### Ver Contenedores en Ejecución

1. Abre Docker Desktop
2. Ve a la pestaña **"Containers"**
3. Verás `integradora` con 3 servicios:
   - `hellhouse-db`
   - `hellhouse-backend`
   - `hellhouse-frontend`

### Ver Logs en Docker Desktop

1. Click en el contenedor que quieres inspeccionar
2. Ve a la pestaña **"Logs"**
3. Puedes buscar, filtrar y descargar los logs

### Detener/Iniciar Servicios

1. Selecciona el contenedor o grupo
2. Click en **Stop** / **Start** / **Restart**
3. O usa los botones de acción rápida

### Ver Recursos Utilizados

1. Ve a la pestaña **"Stats"**
2. Verás uso de CPU, memoria, red y disco
3. Útil para detectar problemas de rendimiento

## 🔒 Seguridad

### Producción

⚠️ **NUNCA uses estas credenciales en producción**:

- Cambia `DB_PASSWORD` a algo seguro
- Usa secretos de Docker en lugar de variables de entorno
- Configura HTTPS/SSL
- Limita el acceso a los puertos
- Usa imágenes específicas con tags (no `latest`)

### Archivo .env

⚠️ **NUNCA commitees el archivo `.env`** al repositorio:

```bash
# Asegúrate de que .env está en .gitignore
echo ".env" >> .gitignore
```

## 📝 Comandos de Mantenimiento

```bash
# Ver imágenes creadas
docker images

# Eliminar imágenes no usadas
docker image prune

# Eliminar contenedores detenidos
docker container prune

# Limpiar todo (contenedores, imágenes, volúmenes, redes)
docker system prune -a --volumes

# Ver uso de espacio en disco
docker system df
```

## 🚀 Despliegue a Producción

Para desplegar en un servidor:

1. **Usa un registro de imágenes** (Docker Hub, AWS ECR, etc.)
2. **Configura secretos** apropiadamente
3. **Usa docker-compose.prod.yml** específico para producción
4. **Configura reverse proxy** (Nginx, Traefik)
5. **Habilita HTTPS** con Let's Encrypt
6. **Configura backups** de la base de datos

## 📚 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)

## 🆘 Obtener Ayuda

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica el estado: `docker-compose ps`
3. Revisa las variables de entorno en `.env`
4. Reinicia los servicios: `docker-compose restart`
5. Como último recurso: `docker-compose down -v && docker-compose up --build`

---

**¡Listo!** 🎉 Tu proyecto Hell House debería estar corriendo en Docker.

**URLs de acceso:**
- 🌐 Frontend: http://localhost:4200
- 🔌 Backend: http://localhost:3000
- ❤️ Health Check: http://localhost:3000/health


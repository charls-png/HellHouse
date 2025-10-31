# ⚡ Inicio Rápido - Hell House Chronicles

Guía ultra-rápida para desarrolladores que quieren empezar YA.

## 🎯 TL;DR

```bash
# 1. Base de datos
psql -U postgres -c "CREATE DATABASE hellhouse_db;"
psql -U postgres -d hellhouse_db -f database/schema.sql

# 2. Backend
cd backend
npm install
cp .env.example .env  # EDITAR CON TUS DATOS
npm run dev

# 3. Frontend (nueva terminal)
cd frontend
npm install
ng serve

# 4. Abrir: http://localhost:4200
```

---

## ✅ Checklist Pre-Instalación

Antes de empezar, asegúrate de tener:

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] PostgreSQL 14+ instalado y corriendo
- [ ] Angular CLI global (`ng version`)
- [ ] Editor de código (VS Code recomendado)

### Instalar lo que falta:

```bash
# Node.js
# Windows: https://nodejs.org/
# Mac: brew install node
# Linux: sudo apt install nodejs npm

# PostgreSQL
# Windows: https://www.postgresql.org/download/
# Mac: brew install postgresql
# Linux: sudo apt install postgresql postgresql-contrib

# Angular CLI
npm install -g @angular/cli
```

---

## 🗄️ Configurar Base de Datos (2 minutos)

### Opción A: Comando único (Windows PowerShell/CMD)
```bash
psql -U postgres -c "CREATE DATABASE hellhouse_db;" && psql -U postgres -d hellhouse_db -f database/schema.sql
```

### Opción B: Paso a paso
```bash
# 1. Abrir psql
psql -U postgres

# 2. Dentro de psql
CREATE DATABASE hellhouse_db;
\q

# 3. Ejecutar schema
psql -U postgres -d hellhouse_db -f database/schema.sql
```

### Verificar:
```bash
psql -U postgres -d hellhouse_db -c "SELECT * FROM news;"
```
Deberías ver 3 noticias.

---

## 🔧 Configurar Backend (3 minutos)

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

### Editar `backend/.env`:

```env
# MÍNIMO NECESARIO PARA FUNCIONAR
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hellhouse_db
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_POSTGRES

# Email (opcional para pruebas sin email)
RESEND_API_KEY=re_123456  # Dejar vacío si no tienes
EMAIL_FROM=test@test.com

FRONTEND_URL=http://localhost:4200
```

### Iniciar:
```bash
npm run dev
```

Verás:
```
🏚️  ==========================================
   HELL HOUSE CHRONICLES - Backend API
   ==========================================
   🚀 Servidor corriendo en puerto 3000
```

### Probar:
Abrir: http://localhost:3000/health

Deberías ver:
```json
{"success":true,"message":"Hell House API is running..."}
```

---

## 🎨 Configurar Frontend (2 minutos)

**Abrir NUEVA TERMINAL** (dejar el backend corriendo)

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

Verás:
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

### Abrir en navegador:
http://localhost:4200

¡Deberías ver la página oscura de Hell House Chronicles! 🏚️

---

## 🧪 Probar Funcionalidades

### 1. Probar Newsletter

1. Scroll hasta la sección "Newsletter"
2. Ingresa un email válido
3. Click en "Suscribirse"
4. Deberías ver mensaje de éxito

**Nota**: Si no configuraste email, verás el mensaje pero no recibirás email real (está OK para desarrollo).

### 2. Ver Noticias

Las 3 noticias de ejemplo ya deberían aparecer automáticamente.

---

## 🔍 Solución de Problemas Rápida

### ❌ "Cannot connect to PostgreSQL"

```bash
# Windows: Verificar que PostgreSQL esté corriendo
Servicios > PostgreSQL > Iniciar

# Mac/Linux
sudo systemctl start postgresql
```

### ❌ "Port 4200 is already in use"

```bash
ng serve --port 4201
```

### ❌ "Port 3000 is already in use"

Edita `backend/.env`:
```env
PORT=3001
```

Y actualiza `frontend/src/app/services/api.service.ts`:
```typescript
private apiUrl = 'http://localhost:3001/api';
```

### ❌ Frontend no carga datos del backend

1. Verifica que el backend esté corriendo
2. Abre la consola del navegador (F12)
3. Busca errores CORS
4. Verifica que la URL en `api.service.ts` sea correcta

### ❌ "npm install" falla

```bash
# Limpiar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Próximos Pasos

Una vez que todo funcione:

1. **Configurar Email** (para recibir correos reales)
   - Ver: [SETUP.md](SETUP.md) sección "Configurar Servicio de Email"

2. **Agregar Contenido**
   - Ver: [CONTENT_IDEAS.md](CONTENT_IDEAS.md)
   - Agregar imágenes en `frontend/src/assets/images/`
   - Agregar audio en `frontend/src/assets/audio/`

3. **Personalizar**
   - Cambiar colores en `frontend/src/styles.css`
   - Modificar textos en los componentes
   - Agregar más noticias a la base de datos

4. **Documentación Completa**
   - [README.md](README.md) - Overview completo
   - [SETUP.md](SETUP.md) - Guía detallada
   - [DATABASE_OPTIONS.md](DATABASE_OPTIONS.md) - Opciones de BD

---

## 📊 Comandos Útiles

```bash
# Backend
cd backend
npm run dev          # Desarrollo con auto-reload
npm start            # Producción

# Frontend
cd frontend
ng serve             # Desarrollo
ng build             # Build para producción
ng serve --open      # Abrir automáticamente en navegador

# Base de Datos
psql -U postgres -d hellhouse_db              # Conectar
psql -U postgres -d hellhouse_db -c "SELECT COUNT(*) FROM subscribers;"  # Query rápido
```

---

## 🆘 Ayuda

Si sigues teniendo problemas:

1. Revisa el archivo [SETUP.md](SETUP.md) completo
2. Verifica los logs del terminal (backend y frontend)
3. Abre la consola del navegador (F12) para ver errores
4. Busca en la documentación oficial:
   - Angular: https://angular.dev
   - Express: https://expressjs.com
   - PostgreSQL: https://www.postgresql.org/docs/

---

## ⏱️ Tiempo Total

- ✅ PostgreSQL: 2 minutos
- ✅ Backend: 3 minutos
- ✅ Frontend: 2 minutos
- ✅ Pruebas: 1 minuto

**Total: ~8 minutos** para tener todo corriendo 🚀

---

<div align="center">

**¡Ahora a crear terror! 🏚️👻**

¿Problemas? → [SETUP.md](SETUP.md)
¿Ideas? → [CONTENT_IDEAS.md](CONTENT_IDEAS.md)

</div>



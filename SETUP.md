# 🏚️ Hell House Chronicles - Guía de Instalación

Esta guía te ayudará a configurar y ejecutar el proyecto completo.

## 📋 Pre-requisitos

### Software Necesario:

1. **Node.js** (v18 o superior)
   - Descargar: https://nodejs.org/

2. **PostgreSQL** (v14 o superior)
   - Descargar: https://www.postgresql.org/download/
   - O usar Docker: `docker run --name hellhouse-postgres -e POSTGRES_PASSWORD=tu_password -p 5432:5432 -d postgres`

3. **Angular CLI** (v18 o superior)
   ```bash
   npm install -g @angular/cli
   ```

## 🗄️ Configuración de la Base de Datos

### 1. Instalar PostgreSQL

Si usas Windows, descarga el instalador oficial de PostgreSQL.

### 2. Crear la Base de Datos

Abre la terminal de PostgreSQL (psql) o usa pgAdmin:

```sql
-- Conectarse como postgres
psql -U postgres

-- Crear la base de datos
CREATE DATABASE hellhouse_db;

-- Salir
\q
```

### 3. Ejecutar el Schema

Desde el directorio raíz del proyecto:

```bash
psql -U postgres -d hellhouse_db -f database/schema.sql
```

O copia y pega el contenido de `database/schema.sql` en pgAdmin.

### 4. Verificar las Tablas

```sql
psql -U postgres -d hellhouse_db

-- Listar tablas
\dt

-- Deberías ver: subscribers, sent_emails, news, page_visits
```

## 🔧 Configuración del Backend

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en el directorio `backend/`:

```bash
# Copiar el ejemplo
cp .env.example .env
```

Edita `backend/.env` con tus configuraciones:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hellhouse_db
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_AQUI

# Email Service (Resend - Recomendado)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Hell House Chronicles <onboarding@resend.dev>

# Frontend URL
FRONTEND_URL=http://localhost:4200

# Security
JWT_SECRET=tu_secreto_super_seguro_12345
```

### 3. Configurar Servicio de Email

#### Opción A: Resend (Recomendado - Fácil)

1. Crear cuenta en https://resend.com (gratis)
2. Verificar email
3. Ir a API Keys y crear una nueva
4. Copiar la API Key al archivo `.env`
5. Para pruebas, puedes usar `onboarding@resend.dev` como remitente

#### Opción B: SendGrid

1. Crear cuenta en https://sendgrid.com (100 emails gratis/día)
2. Crear API Key
3. Actualizar `backend/src/config/email.js` para usar SendGrid en lugar de Resend

#### Opción C: Gmail SMTP (con Nodemailer)

Ver documentación en `backend/README.md`

### 4. Iniciar el Backend

```bash
cd backend
npm run dev
```

Deberías ver:

```
🏚️  ==========================================
   HELL HOUSE CHRONICLES - Backend API
   ==========================================
   🚀 Servidor corriendo en puerto 3000
   🌍 URL: http://localhost:3000
   📊 Health: http://localhost:3000/health
   ==========================================
```

### 5. Probar la API

Abre el navegador en: http://localhost:3000/health

Deberías ver:
```json
{
  "success": true,
  "message": "Hell House API is running...",
  "timestamp": "2025-10-29T..."
}
```

## 🎨 Configuración del Frontend

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Iniciar el Frontend

```bash
ng serve
```

O con puerto específico:

```bash
ng serve --port 4200
```

### 3. Abrir en el Navegador

Navega a: http://localhost:4200

¡Deberías ver la página de Hell House Chronicles con el diseño oscuro y tenebroso! 🏚️

## 🧪 Probar Funcionalidades

### Probar Newsletter

1. Ve a la sección de Newsletter en la página
2. Ingresa un email válido
3. Haz clic en "Suscribirse"
4. Revisa tu email (si configuraste correctamente Resend)

### Probar Noticias

Las noticias de ejemplo ya están cargadas en la base de datos desde el schema.sql.

## 🔍 Solución de Problemas

### El backend no conecta a PostgreSQL

1. Verifica que PostgreSQL esté corriendo:
   ```bash
   # Windows
   Servicios > PostgreSQL
   
   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. Verifica las credenciales en `.env`

3. Prueba la conexión manualmente:
   ```bash
   psql -U postgres -d hellhouse_db
   ```

### El frontend no conecta al backend

1. Verifica que el backend esté corriendo en http://localhost:3000
2. Revisa la consola del navegador (F12)
3. Verifica que CORS esté configurado correctamente en `backend/src/server.js`

### No recibo emails

1. Para pruebas, usa Resend con `onboarding@resend.dev` como remitente
2. Verifica que la API Key esté correctamente configurada
3. Revisa los logs del backend para ver errores

### Errores de compilación en Angular

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Comandos Útiles

### Backend
```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

### Frontend
```bash
# Desarrollo
ng serve

# Build para producción
ng build --configuration production

# Ejecutar tests
ng test
```

### Base de Datos
```bash
# Conectarse
psql -U postgres -d hellhouse_db

# Ver suscriptores
SELECT * FROM subscribers;

# Ver noticias
SELECT * FROM news;

# Borrar todos los suscriptores (para pruebas)
DELETE FROM subscribers;
```

## 🚀 Próximos Pasos

1. ✅ Verifica que todo funciona correctamente
2. 📧 Configura tu servicio de email preferido
3. 🎨 Agrega tus imágenes de terror en `frontend/src/assets/images/`
4. 🔊 Agrega audio ambiental en `frontend/src/assets/audio/`
5. 📝 Crea más noticias en la base de datos
6. 🎮 Empieza a personalizar la experiencia

## 🆘 Ayuda

Si encuentras problemas:
1. Revisa los logs del backend
2. Revisa la consola del navegador (F12)
3. Verifica que todos los servicios estén corriendo
4. Consulta el README.md principal

---

¡Disfruta creando tu experiencia de terror! 🏚️👻



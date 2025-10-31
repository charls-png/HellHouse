# 🗄️ Opciones de Base de Datos para Hell House Chronicles

Este documento explica las diferentes opciones de base de datos que puedes usar para tu proyecto.

## 📊 Comparación de Opciones

| Base de Datos | Dificultad | Costo | Mejor Para |
|--------------|------------|-------|------------|
| **PostgreSQL** ✅ | Media | Gratis | Producción profesional |
| **MongoDB** | Media | Gratis | Flexibilidad de schema |
| **Supabase** | Fácil | Gratis (con límites) | Desarrollo rápido |
| **Firebase** | Fácil | Gratis (con límites) | Prototipos rápidos |

---

## 1. PostgreSQL (Actual - Recomendada) ✅

### ✅ Ventajas:
- Base de datos relacional robusta y madura
- Perfecta para relaciones complejas (subscribers, emails, news)
- Gratuita y open source
- Excelente rendimiento
- Ideal para aprender SQL
- Fácil de escalar

### ❌ Desventajas:
- Requiere instalación local o servidor
- Curva de aprendizaje de SQL
- Configuración inicial más compleja

### 📦 Instalación:

**Windows:**
1. Descargar de https://www.postgresql.org/download/windows/
2. Ejecutar instalador (incluye pgAdmin)
3. Configurar password para usuario `postgres`

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Docker:**
```bash
docker run --name hellhouse-postgres \
  -e POSTGRES_PASSWORD=tu_password \
  -p 5432:5432 \
  -v hellhouse_data:/var/lib/postgresql/data \
  -d postgres:14
```

### 🔧 Configuración Actual:

El proyecto ya está configurado para PostgreSQL. Solo necesitas:

1. Instalar PostgreSQL
2. Crear la base de datos: `CREATE DATABASE hellhouse_db;`
3. Ejecutar el schema: `psql -U postgres -d hellhouse_db -f database/schema.sql`
4. Configurar `.env` en el backend

---

## 2. MongoDB

MongoDB es una base de datos NoSQL que almacena datos en formato JSON.

### ✅ Ventajas:
- No requiere schema fijo
- Fácil de escalar horizontalmente
- Buen soporte para datos no estructurados
- Sintaxis JavaScript-like

### ❌ Desventajas:
- No es ideal para relaciones complejas
- Menos consistencia que SQL
- Mayor uso de disco

### 🔄 Migración a MongoDB:

Si prefieres usar MongoDB, necesitarás:

**1. Instalar MongoDB:**

```bash
# Con Docker
docker run --name hellhouse-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -p 27017:27017 \
  -d mongo:latest
```

**2. Cambiar dependencias del backend:**

```bash
cd backend
npm uninstall pg
npm install mongoose
```

**3. Crear nuevo modelo de datos:**

```javascript
// backend/src/config/database.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// backend/src/models/subscriberModel.js
import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: String,
  isActive: {
    type: Boolean,
    default: true
  },
  unsubscribeToken: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Subscriber', subscriberSchema);
```

**4. Actualizar .env:**

```env
MONGO_URI=mongodb://admin:password@localhost:27017/hellhouse_db?authSource=admin
```

---

## 3. Supabase

Supabase es un "Backend as a Service" basado en PostgreSQL.

### ✅ Ventajas:
- PostgreSQL en la nube
- Auth, Storage y APIs listas
- Dashboard visual
- Hosting gratuito (500MB)
- No requiere instalación local

### ❌ Desventajas:
- Límites en plan gratuito
- Dependencia de servicio externo
- Menos control sobre la infraestructura

### 🚀 Configuración con Supabase:

**1. Crear cuenta:**
- Ve a https://supabase.com
- Crea un nuevo proyecto
- Anota la URL y API Key

**2. Crear tablas:**
- Usa el SQL Editor en Supabase Dashboard
- Pega el contenido de `database/schema.sql`

**3. Instalar SDK:**

```bash
cd backend
npm install @supabase/supabase-js
```

**4. Actualizar configuración:**

```javascript
// backend/src/config/database.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**5. Actualizar .env:**

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-anon-key
```

---

## 4. Firebase

Firebase es la plataforma de Google para desarrollo de apps.

### ✅ Ventajas:
- Setup súper rápido
- Auth integrada
- Real-time database
- Hosting incluido
- Generoso plan gratuito

### ❌ Desventajas:
- NoSQL (Firestore)
- Queries limitadas
- Vendor lock-in
- Precios pueden escalar rápido

### 🚀 Configuración con Firebase:

**1. Crear proyecto:**
- Ve a https://console.firebase.google.com
- Crea un nuevo proyecto
- Habilita Firestore Database

**2. Instalar SDK:**

```bash
cd backend
npm install firebase-admin
```

**3. Configurar credenciales:**

```javascript
// backend/src/config/database.js
import admin from 'firebase-admin';
import serviceAccount from './firebase-credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
```

**4. Estructura de colecciones:**

```javascript
// Colecciones de Firestore
subscribers/
  {userId}/
    email: string
    name: string
    isActive: boolean
    subscribedAt: timestamp

news/
  {newsId}/
    title: string
    content: string
    publishedAt: timestamp
```

---

## 🎯 Recomendación Final

### Para este proyecto específico: **PostgreSQL** ✅

**Razones:**

1. **Newsletter necesita relaciones**: subscribers → sent_emails
2. **Transacciones confiables**: Importante para evitar emails duplicados
3. **Queries complejas**: Filtrar noticias, contar suscriptores, etc.
4. **Aprendizaje**: PostgreSQL es estándar en la industria
5. **Gratuito**: Sin límites ni cargos ocultos
6. **Control total**: Tu data, tu servidor

### Cuándo usar las alternativas:

- **MongoDB**: Si necesitas almacenar datos muy variables (ej: logs, eventos)
- **Supabase**: Si quieres deploy rápido sin configurar servidor
- **Firebase**: Si es un prototipo o MVP rápido

---

## 🔄 Cambiar de Base de Datos

Si decides cambiar, sigue estos pasos:

1. Crear backup de datos actuales
2. Instalar nueva base de datos
3. Actualizar dependencias del backend
4. Adaptar los modelos de datos
5. Migrar datos existentes
6. Actualizar `.env`
7. Probar todas las funcionalidades

---

## 📚 Recursos Adicionales

### PostgreSQL:
- Docs oficiales: https://www.postgresql.org/docs/
- Tutorial: https://www.postgresqltutorial.com/
- pgAdmin: https://www.pgadmin.org/

### MongoDB:
- Docs oficiales: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/
- MongoDB Atlas (cloud): https://www.mongodb.com/atlas

### Supabase:
- Docs: https://supabase.com/docs
- YouTube tutorials: Supabase channel

### Firebase:
- Docs: https://firebase.google.com/docs
- Firestore: https://firebase.google.com/docs/firestore

---

¿Preguntas? Revisa SETUP.md para más detalles sobre la configuración actual.



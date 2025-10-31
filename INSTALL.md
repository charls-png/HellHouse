# 🚀 Instalación Paso a Paso - Hell House Chronicles

## ⏱️ Tiempo estimado: 8-10 minutos

---

## 📋 PASO 1: Verificar Pre-requisitos

### Abrir PowerShell como Administrador y ejecutar:

```powershell
# Verificar Node.js (debe ser v18+)
node --version

# Verificar npm
npm --version

# Verificar PostgreSQL
psql --version

# Verificar Angular CLI
ng version
```

### Si falta algo, instalar:

```powershell
# Instalar Angular CLI globalmente
npm install -g @angular/cli
```

---

## 📊 PASO 2: Configurar Base de Datos PostgreSQL

### Opción A: Comando único (Recomendado)

```powershell
# Crear base de datos y cargar schema
psql -U postgres -c "CREATE DATABASE hellhouse_db;"
psql -U postgres -d hellhouse_db -f database/schema.sql
```

### Opción B: Paso a paso

```powershell
# 1. Abrir PostgreSQL
psql -U postgres

# 2. Dentro de psql, ejecutar:
# CREATE DATABASE hellhouse_db;
# \q

# 3. Cargar el schema
psql -U postgres -d hellhouse_db -f database/schema.sql
```

### Verificar que funcionó:

```powershell
psql -U postgres -d hellhouse_db -c "SELECT COUNT(*) FROM news;"
```

Deberías ver: `count = 3`

---

## ⚙️ PASO 3: Configurar Backend

```powershell
# Navegar a la carpeta backend
cd backend

# Instalar dependencias (esto puede tomar 1-2 minutos)
npm install

# El archivo .env ya está creado, solo necesitas editarlo
# Abre backend/.env con tu editor favorito y cambia:
# - DB_PASSWORD: Tu contraseña real de PostgreSQL
```

### Editar `backend/.env`:

Abre el archivo `backend\.env` con Notepad o tu editor y cambia la línea:

```env
DB_PASSWORD=postgres
```

Por tu contraseña real de PostgreSQL (la que pusiste al instalarlo).

### Iniciar el backend:

```powershell
# Asegúrate de estar en la carpeta backend
npm run dev
```

Deberías ver:

```
🏚️  ==========================================
   HELL HOUSE CHRONICLES - Backend API
   ==========================================
   🚀 Servidor corriendo en puerto 3000
```

**¡Deja esta terminal abierta!**

---

## 🎨 PASO 4: Configurar Frontend

### Abrir NUEVA terminal PowerShell (la otra debe seguir corriendo)

```powershell
# Navegar a la carpeta frontend desde la raíz
cd frontend

# Instalar dependencias (esto puede tomar 2-3 minutos)
npm install

# Iniciar el servidor de desarrollo
ng serve
```

Deberías ver:

```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

---

## 🌐 PASO 5: Abrir en Navegador

Abre tu navegador favorito en:

**http://localhost:4200**

¡Deberías ver la página oscura de Hell House Chronicles! 🏚️

---

## ✅ PASO 6: Probar Funcionalidades

### 1. Probar que el backend responde:

Abre en el navegador: **http://localhost:3000/health**

Deberías ver JSON:
```json
{"success":true,"message":"Hell House API is running..."}
```

### 2. Probar Newsletter:

1. En la página principal, scroll hasta "Newsletter"
2. Ingresa tu email
3. Click en "Suscribirse"
4. Deberías ver mensaje de éxito

**Nota**: Si no configuraste Resend API key, no recibirás email (pero funciona igual para desarrollo).

### 3. Ver Noticias:

Las 3 noticias de ejemplo deberían aparecer automáticamente en la página.

---

## 🔧 Solución de Problemas

### ❌ Error: "Cannot connect to database"

```powershell
# Verificar que PostgreSQL esté corriendo
# En Servicios de Windows, busca "postgresql" y asegúrate que esté iniciado

# O reinicia el servicio:
net stop postgresql-x64-14
net start postgresql-x64-14
```

### ❌ Error: "Port 4200 is already in use"

```powershell
# Usar otro puerto:
ng serve --port 4201
```

### ❌ Error: "Port 3000 is already in use"

1. Edita `backend\.env` y cambia:
   ```env
   PORT=3001
   ```

2. Edita `frontend\src\app\services\api.service.ts` línea 30:
   ```typescript
   private apiUrl = 'http://localhost:3001/api';
   ```

### ❌ Error: "npm install" falla

```powershell
# Limpiar cache y reinstalar
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📧 PASO EXTRA: Configurar Email (Opcional)

Si quieres recibir emails reales:

### 1. Crear cuenta en Resend:

https://resend.com/signup (es gratis)

### 2. Obtener API Key:

- Ve a: https://resend.com/api-keys
- Crea una nueva API key
- Copia la key (comienza con `re_`)

### 3. Editar `backend\.env`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_FROM=tu-email@ejemplo.com
```

### 4. Reiniciar el backend:

Cierra la terminal del backend (Ctrl+C) y vuelve a ejecutar:

```powershell
npm run dev
```

---

## 🎯 Comandos Útiles

### Para detener los servidores:

```powershell
# Presiona Ctrl+C en cada terminal
```

### Para reiniciar:

```powershell
# Backend:
cd backend
npm run dev

# Frontend (otra terminal):
cd frontend
ng serve
```

### Ver logs de PostgreSQL:

```powershell
psql -U postgres -d hellhouse_db -c "SELECT * FROM subscribers;"
psql -U postgres -d hellhouse_db -c "SELECT * FROM news;"
```

---

## 📊 Checklist Final

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `hellhouse_db` creada
- [ ] Schema cargado (3 noticias en la BD)
- [ ] Backend corriendo en http://localhost:3000
- [ ] Frontend corriendo en http://localhost:4200
- [ ] Página carga correctamente
- [ ] Newsletter funciona (muestra mensaje de éxito)
- [ ] Noticias se muestran
- [ ] (Opcional) Email configurado con Resend

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:

1. Revisa los logs en las terminales (backend y frontend)
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que PostgreSQL esté corriendo
4. Revisa que el archivo `.env` tenga la contraseña correcta

---

## 🎉 ¡Todo Listo!

Ahora puedes:

- 🎨 Personalizar los estilos en `frontend/src/styles.css`
- 📝 Modificar textos en los componentes
- 📰 Agregar más noticias a la base de datos
- 🖼️ Agregar imágenes en `frontend/src/assets/images/`
- 🔊 Agregar audio en `frontend/src/assets/audio/`

Ver más ideas en: `CONTENT_IDEAS.md`

---

<div align="center">

**🏚️ ¡Bienvenido a Hell House Chronicles! 🏚️**

*"El hotel está esperando..."*

</div>


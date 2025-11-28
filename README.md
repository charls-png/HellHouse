# 🏚️ Hell House Chronicles - Página Web de Terror

> *"Algunos lugares no deben ser perturbados..."*

Página web informativa inspirada en **Hell House LLC** para promocionar un juego de terror. Diseño oscuro, tenebroso y minimalista, sin exceso de RGB o luces, solo terror psicológico puro.

![Status](https://img.shields.io/badge/status-active-success)
![Angular](https://img.shields.io/badge/Angular-18+-red)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)

---

## 📖 Tabla de Contenidos

- [🎯 Stack Tecnológico](#-stack-tecnológico)
- [✨ Características](#-características)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📚 Documentación](#-documentación)
- [🎨 Diseño](#-diseño)
- [📸 Screenshots](#-screenshots)
- [🤝 Contribuir](#-contribuir)

---

## 🎯 Stack Tecnológico

### Frontend
- **Angular 18+** - Framework principal
- **TypeScript** - Lenguaje
- **CSS3** - Estilos (sin frameworks, diseño custom)
- **RxJS** - Manejo de observables

### Backend
- **Node.js 18+** - Runtime
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **Resend** - Servicio de emails (recomendado)

### DevOps
- **Docker & Docker Compose** - Contenedores para desarrollo y producción ✅
- **GitHub Actions** - Automatización de pruebas (linting HTML, CSS, JavaScript) ✅
- **Nginx** - Servidor web para el frontend ✅
- **PostgreSQL** - Base de datos en contenedor ✅

---

## ✨ Características

### 🏚️ Diseño Tenebroso
- Tema oscuro inspirado en Hell House LLC
- Efectos de glitch y parpadeo sutiles
- Tipografía estilo found footage
- Colores: Negro, gris oscuro, rojo sangre
- **Sin RGB ni luces excesivas** - Terror puro

### 📧 Newsletter Funcional
- Sistema de suscripción con validación
- Emails personalizados con diseño tenebroso
- Confirmación por email (real)
- Cancelación de suscripción con token único
- Base de datos PostgreSQL para gestión

### 📰 Sistema de Noticias
- CRUD completo de noticias
- Noticias de ejemplo pre-cargadas
- Diseño tipo "documento clasificado"
- Filtrado y ordenamiento

### 🎮 Información del Juego
- Timeline de eventos del hotel
- Historia del Hotel Abaddon
- Características del juego
- Testimonios inquietantes
- Ready para galería de imágenes
- Ready para audio ambiental

### 🔒 Seguridad
- Validación de inputs
- Protección CSRF
- Headers de seguridad (Helmet)
- Sanitización de datos
- Rate limiting (futuro)

---

## 📁 Estructura del Proyecto

```
Integradora/
├── frontend/                    # Angular App
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── header/      # Navegación principal
│   │   │   │   ├── footer/      # Pie de página
│   │   │   │   ├── home/        # Página principal
│   │   │   │   ├── news/        # Lista de noticias
│   │   │   │   └── newsletter/  # Formulario de suscripción
│   │   │   ├── services/
│   │   │   │   └── api.service.ts   # Servicio HTTP
│   │   │   ├── app.routes.ts    # Rutas
│   │   │   └── app.config.ts    # Configuración
│   │   ├── assets/              # Recursos estáticos (imágenes, audio)
│   │   ├── styles.css           # Estilos globales
│   │   └── index.html
│   └── package.json
│
├── backend/                     # Node.js API
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # Conexión PostgreSQL
│   │   │   └── email.js         # Configuración email
│   │   ├── controllers/
│   │   │   ├── subscriberController.js
│   │   │   └── newsController.js
│   │   ├── models/
│   │   │   ├── subscriberModel.js
│   │   │   └── newsModel.js
│   │   ├── routes/
│   │   │   ├── subscriberRoutes.js
│   │   │   └── newsRoutes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── server.js            # Punto de entrada
│   ├── .env.example
│   └── package.json
│
├── database/
│   └── schema.sql               # Schema PostgreSQL
│
├── .github/
│   └── workflows/
│       └── lint.yml             # Workflow de GitHub Actions para linting
│
├── .htmlhintrc                  # Configuración de HTMLHint
├── .stylelintrc.json            # Configuración de Stylelint
├── .eslintrc.json               # Configuración de ESLint
│
├── README.md                    # Este archivo
├── SETUP.md                     # Guía de instalación detallada
├── DATABASE_OPTIONS.md          # Opciones de base de datos
├── CONTENT_IDEAS.md             # Ideas de contenido
├── AUTOMATION_DOCUMENTATION.md  # Documentación de automatización de pruebas
└── LINTING_QUICKSTART.md        # Guía rápida de linting
```

---

## 🚀 Inicio Rápido

### Opción 1: Con Docker (Recomendado) 🐳

**Requisitos**: Solo Docker Desktop instalado

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd Integradora

# 2. Crear archivo .env (opcional, usa valores por defecto)
# Ver DOCKER_README.md para más detalles

# 3. Iniciar todos los servicios
docker-compose up --build

# 4. Abrir en navegador
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
```

Ver **[DOCKER_README.md](DOCKER_README.md)** para instrucciones detalladas.

### Opción 2: Instalación Local

**Requisitos**:
- Node.js 18+ ([Descargar](https://nodejs.org/))
- PostgreSQL 14+ ([Descargar](https://www.postgresql.org/download/))
- Angular CLI: `npm install -g @angular/cli`

### Instalación Express (5 minutos)

```bash
# 1. Clonar el repositorio (si aplica)
git clone <repo-url>
cd Integradora

# 2. Configurar Base de Datos
psql -U postgres
CREATE DATABASE hellhouse_db;
\q
psql -U postgres -d hellhouse_db -f database/schema.sql

# 3. Configurar Backend
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev

# 4. Configurar Frontend (en otra terminal)
cd frontend
npm install
ng serve

# 5. Abrir en navegador
# http://localhost:4200
```

### Verificar Instalación

- **Frontend**: http://localhost:4200 (deberías ver la página oscura)
- **Backend**: http://localhost:3000/health (debería retornar JSON con `success: true`)
- **Base de Datos**: Ejecutar `SELECT * FROM news;` en psql (deberías ver 3 noticias)

---

## 📚 Documentación

### Documentos Disponibles

- **[DEPLOY_GITHUB_PAGES.md](DEPLOY_GITHUB_PAGES.md)** - 🚀 Documentación completa de despliegue a GitHub Pages
- **[RESUMEN_DESPLIEGUE.md](RESUMEN_DESPLIEGUE.md)** - 📋 Resumen ejecutivo del despliegue
- **[CONFIGURACION_GITHUB_PAGES.md](CONFIGURACION_GITHUB_PAGES.md)** - ⚙️ Guía de configuración paso a paso
- **[DOCKER_README.md](DOCKER_README.md)** - 🐳 Guía completa de Docker (Inicio rápido, comandos, solución de problemas)
- **[SLA_ACUERDO_NIVEL_SERVICIO.md](SLA_ACUERDO_NIVEL_SERVICIO.md)** - 📄 Acuerdo de Nivel de Servicio
- **[README.md](README.md)** - Este archivo (Descripción general del proyecto)

### API Endpoints

#### Subscribers
- `POST /api/subscribers/subscribe` - Suscribirse al newsletter
- `GET /api/subscribers/unsubscribe/:token` - Cancelar suscripción
- `GET /api/subscribers/stats` - Estadísticas de suscriptores

#### News
- `GET /api/news` - Obtener todas las noticias
- `GET /api/news/latest?limit=5` - Obtener últimas noticias
- `GET /api/news/:id` - Obtener noticia por ID

### Configuración de Email

Ver [SETUP.md](SETUP.md) para instrucciones detalladas de:
- Resend (Recomendado)
- SendGrid
- Nodemailer con Gmail

---

## 🎨 Diseño

### Inspiración
- **Hell House LLC** (películas 1, 2 y 3)
- Found footage / documental
- Estética sucia y abandonada
- Terror psicológico

### Paleta de Colores
- `#0a0a0a` - Negro profundo (fondo principal)
- `#1a1a1a` - Gris muy oscuro (fondo secundario)
- `#8b0000` - Rojo sangre (acentos)
- `#cccccc` - Gris claro (texto principal)
- `#666666` - Gris medio (texto secundario)

### Tipografías
- **Creepster** - Títulos principales (estilo terror)
- **Special Elite** - Subtítulos (estilo máquina de escribir)
- **Roboto Mono** - Texto body (estilo monoespaciado)

### Efectos
- Animación de glitch en títulos
- Efecto de grano/ruido en todo el sitio
- Transiciones suaves
- Hover effects inquietantes

---

## 📸 Screenshots

*(Agrega screenshots aquí cuando tengas el proyecto corriendo)*

### Página Principal
```
[Insertar imagen de hero section con el título "HELL HOUSE CHRONICLES"]
```

### Newsletter
```
[Insertar imagen del formulario de suscripción]
```

### Noticias
```
[Insertar imagen de las cards de noticias]
```

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completada)
- [x] Diseño base oscuro y tenebroso
- [x] Sistema de newsletter funcional
- [x] Noticias con base de datos
- [x] Backend API REST
- [x] Frontend Angular responsive
- [x] Docker & Docker Compose completo
- [x] Automatización de pruebas con GitHub Actions (linting)

### 🚧 Fase 2 - Contenido (En Progreso)
- [ ] Agregar imágenes del hotel
- [ ] Audio ambiental
- [ ] Más noticias en la BD
- [ ] Galería de "found footage"
- [ ] Videos embebidos

### 🔮 Fase 3 - Interactividad (Futuro)
- [ ] Tour virtual 360° del hotel
- [ ] Minijuego de escape room
- [ ] Sistema de usuarios
- [ ] Comentarios en noticias
- [ ] Chat "haunted"

### ✅ Fase 4 - Producción (Completada)
- [x] Deploy en GitHub Pages (frontend) ✅
- [x] Automatización de despliegue con GitHub Actions ✅
- [x] Pruebas automatizadas antes del despliegue ✅
- [ ] Deploy en Railway/Render (backend)
- [ ] Dominio personalizado
- [ ] SSL/HTTPS (GitHub Pages ya incluye HTTPS)
- [ ] CDN para assets
- [ ] Analytics

---

## 🤝 Contribuir

*(Si es un proyecto colaborativo)*

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/AmazingFeature`
3. Commit tus cambios: `git commit -m 'Add some AmazingFeature'`
4. Push a la rama: `git push origin feature/AmazingFeature`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

## 👥 Autor

Tu nombre / Equipo

---

## 🙏 Agradecimientos

- Películas Hell House LLC por la inspiración
- Comunidad de Angular
- Comunidad de Node.js
- Todos los que contribuyeron

---

## ⚠️ Advertencia

Este es un proyecto de **terror ficticio**. Ningún hotel real fue dañado. El contenido es puramente para entretenimiento.

---

<div align="center">

**¿Te atreves a entrar?**

🏚️ **Hell House Chronicles** 🏚️

</div>


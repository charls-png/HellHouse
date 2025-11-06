# Guía Rápida de Linting

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Ejecutar Linting

#### Frontend (HTML + CSS)

```bash
cd frontend

# Linting completo
npm run lint:all

# Solo HTML
npm run lint:html

# Solo CSS
npm run lint:css

# Corregir errores de CSS automáticamente
npm run lint:fix
```

#### Backend (JavaScript)

```bash
cd backend

# Linting
npm run lint

# Corregir errores automáticamente
npm run lint:fix
```

## 📋 Archivos de Configuración

- `.htmlhintrc` - Configuración de HTMLHint
- `.stylelintrc.json` - Configuración de Stylelint
- `.eslintrc.json` - Configuración de ESLint

## ⚙️ GitHub Actions

El linting se ejecuta automáticamente en:
- Push a `main`, `master`, `develop`
- Pull Requests a estas ramas

Ver resultados en: **Actions** → **Linting Tests**

## 📚 Documentación Completa

Para más detalles, consulta: **[AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)**



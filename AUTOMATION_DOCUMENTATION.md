# Documentación de Automatización de Pruebas

## 📋 Índice

1. [Introducción](#introducción)
2. [Herramientas Utilizadas](#herramientas-utilizadas)
3. [Configuración de Linting](#configuración-de-linting)
4. [GitHub Actions Workflow](#github-actions-workflow)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Ejecución Local](#ejecución-local)
7. [Ejecución Automatizada](#ejecución-automatizada)
8. [Mejores Prácticas](#mejores-prácticas)

---

## 1. Introducción

Este documento describe el proceso de automatización de pruebas implementado en el proyecto **Hell House**. El sistema de automatización incluye pruebas de linting para **HTML** y **CSS** con el objetivo de asegurar buenas prácticas en el código y mantener la calidad del proyecto.

### Objetivos

- ✅ Validar la calidad del código HTML y CSS
- ✅ Asegurar consistencia en el estilo del código
- ✅ Detectar errores y problemas potenciales antes del merge
- ✅ Mantener buenas prácticas de desarrollo
- ✅ Automatizar el proceso de validación mediante GitHub Actions

---

## 2. Herramientas Utilizadas

### 2.1 HTMLHint

**HTMLHint** es una herramienta de linting para HTML que valida la estructura y sintaxis de los archivos HTML.

- **Versión**: 1.1.4
- **Propósito**: Validar estructura HTML, atributos, indentación y buenas prácticas
- **Archivo de configuración**: `.htmlhintrc`

#### Reglas Configuradas

- `tagname-lowercase`: Los nombres de etiquetas deben estar en minúsculas
- `attr-lowercase`: Los atributos deben estar en minúsculas
- `attr-value-double-quotes`: Los valores de atributos deben usar comillas dobles
- `tag-pair`: Todas las etiquetas deben estar cerradas correctamente
- `id-unique`: Los IDs deben ser únicos
- `alt-require`: Las imágenes deben tener atributo `alt`
- `attr-no-duplication`: No se permiten atributos duplicados

### 2.2 Stylelint

**Stylelint** es un linter moderno para CSS que ayuda a mantener código CSS consistente y libre de errores.

- **Versión**: 16.0.0
- **Propósito**: Validar sintaxis CSS, formato, convenciones de nombres y buenas prácticas
- **Archivo de configuración**: `.stylelintrc.json`

#### Configuraciones Extendidas

- `stylelint-config-standard`: Conjunto estándar de reglas
- `stylelint-config-recommended`: Reglas recomendadas para CSS

#### Reglas Principales

- `color-hex-case`: Colores hexadecimales en minúsculas
- `color-hex-length`: Colores hexadecimales cortos cuando sea posible
- `indentation`: Indentación de 2 espacios
- `selector-max-id`: Máximo 2 IDs por selector
- `max-nesting-depth`: Máximo 5 niveles de anidamiento
- `no-duplicate-selectors`: No permitir selectores duplicados
- `declaration-block-trailing-semicolon`: Requerir punto y coma final

### 2.3 ESLint

**ESLint** es un linter para JavaScript que identifica y reporta patrones problemáticos en el código.

- **Versión**: 8.57.0
- **Propósito**: Validar código JavaScript del backend
- **Archivo de configuración**: `.eslintrc.json`

#### Reglas Configuradas

- `indent`: Indentación de 2 espacios
- `quotes`: Uso de comillas simples
- `semi`: Requerir punto y coma
- `no-unused-vars`: Advertir sobre variables no usadas
- `no-console`: Advertir sobre uso de `console.log`

---

## 3. Configuración de Linting

### 3.1 Archivos de Configuración

Los archivos de configuración se encuentran en la raíz del proyecto:

```
Integradora/
├── .htmlhintrc          # Configuración de HTMLHint
├── .stylelintrc.json    # Configuración de Stylelint
└── .eslintrc.json       # Configuración de ESLint
```

### 3.2 Scripts NPM

#### Frontend (`frontend/package.json`)

```json
{
  "scripts": {
    "lint:html": "htmlhint 'src/**/*.html'",
    "lint:css": "stylelint 'src/**/*.css'",
    "lint:all": "npm run lint:html && npm run lint:css",
    "lint:fix": "stylelint 'src/**/*.css' --fix"
  }
}
```

**Comandos disponibles:**

- `npm run lint:html`: Ejecuta linting solo en archivos HTML
- `npm run lint:css`: Ejecuta linting solo en archivos CSS
- `npm run lint:all`: Ejecuta ambos linters (HTML y CSS)
- `npm run lint:fix`: Corrige automáticamente errores de CSS cuando sea posible

#### Backend (`backend/package.json`)

```json
{
  "scripts": {
    "lint": "eslint 'src/**/*.js'",
    "lint:fix": "eslint 'src/**/*.js' --fix"
  }
}
```

**Comandos disponibles:**

- `npm run lint`: Ejecuta ESLint en todos los archivos JavaScript
- `npm run lint:fix`: Corrige automáticamente errores cuando sea posible

---

## 4. GitHub Actions Workflow

### 4.1 Ubicación

El workflow de GitHub Actions se encuentra en:

```
.github/workflows/lint.yml
```

### 4.2 Triggers

El workflow se ejecuta automáticamente en los siguientes casos:

- **Push** a las ramas: `main`, `master`, `develop`
- **Pull Request** dirigidas a las ramas: `main`, `master`, `develop`

### 4.3 Jobs del Workflow

El workflow consta de **3 jobs** principales:

#### 4.3.1 `lint-frontend`

**Objetivo**: Validar código HTML y CSS del frontend

**Pasos:**

1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js versión 20 con caché de npm
3. **Install dependencies**: Instala dependencias del frontend
4. **Run HTML linting**: Ejecuta HTMLHint
5. **Run CSS linting**: Ejecuta Stylelint
6. **Upload results**: Sube resultados si hay errores (opcional)

#### 4.3.2 `lint-backend`

**Objetivo**: Validar código JavaScript del backend

**Pasos:**

1. **Checkout**: Descarga el código del repositorio
2. **Setup Node.js**: Configura Node.js versión 20 con caché de npm
3. **Install dependencies**: Instala dependencias del backend
4. **Run ESLint**: Ejecuta ESLint
5. **Upload results**: Sube resultados si hay errores (opcional)

#### 4.3.3 `lint-all`

**Objetivo**: Generar un reporte completo de todos los linters

**Dependencias**: Espera a que `lint-frontend` y `lint-backend` terminen

**Pasos:**

1. **Checkout**: Descarga el código
2. **Download frontend results**: Descarga resultados del frontend
3. **Download backend results**: Descarga resultados del backend
4. **Generate summary**: Genera un resumen en GitHub Actions

### 4.4 Visualización de Resultados

Los resultados se pueden ver en:

- **GitHub Actions Tab**: En la pestaña "Actions" del repositorio
- **Pull Request**: Los checks aparecen directamente en el PR
- **Artifacts**: Si hay errores, se pueden descargar los resultados detallados

---

## 5. Estructura del Proyecto

### 5.1 Organización de Carpetas

```
Integradora/
├── .github/
│   └── workflows/
│       └── lint.yml              # Workflow de GitHub Actions
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # Componentes Angular
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.css
│   │   │   │   │   └── header.component.ts
│   │   │   │   ├── home/
│   │   │   │   │   ├── home.component.html
│   │   │   │   │   ├── home.component.css
│   │   │   │   │   └── home.component.ts
│   │   │   │   └── ...
│   │   │   ├── services/         # Servicios Angular
│   │   │   └── ...
│   │   ├── assets/              # Recursos estáticos
│   │   └── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/              # Configuraciones
│   │   ├── controllers/        # Controladores
│   │   ├── models/             # Modelos
│   │   ├── routes/             # Rutas
│   │   └── middleware/         # Middleware
│   └── package.json
├── database/
│   └── schema.sql              # Esquema de base de datos
├── .htmlhintrc                 # Configuración HTMLHint
├── .stylelintrc.json          # Configuración Stylelint
├── .eslintrc.json             # Configuración ESLint
└── README.md
```

### 5.2 Buenas Prácticas de Estructura

✅ **Separación de responsabilidades**: Frontend y backend en carpetas separadas  
✅ **Componentes modulares**: Cada componente tiene su propio HTML, CSS y TypeScript  
✅ **Servicios centralizados**: Servicios reutilizables en carpeta `services/`  
✅ **Configuración centralizada**: Archivos de configuración en la raíz  
✅ **Documentación clara**: README y documentación en la raíz del proyecto  

---

## 6. Ejecución Local

### 6.1 Instalación de Dependencias

Primero, instala las dependencias necesarias:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 6.2 Ejecutar Linting Manualmente

#### Frontend

```bash
cd frontend

# Linting de HTML
npm run lint:html

# Linting de CSS
npm run lint:css

# Linting completo (HTML + CSS)
npm run lint:all

# Corregir errores de CSS automáticamente
npm run lint:fix
```

#### Backend

```bash
cd backend

# Linting de JavaScript
npm run lint

# Corregir errores automáticamente
npm run lint:fix
```

### 6.3 Ejemplo de Salida

**HTML Hint - Sin errores:**
```
✓ No problems found in 12 files
```

**HTML Hint - Con errores:**
```
src/app/components/home/home.component.html
  Line 15, Col 5: Tag must be paired, no start tag: <div> (tag-pair)
  Line 20, Col 10: Attribute value must be in double quotes (attr-value-double-quotes)
```

**Stylelint - Sin errores:**
```
✔ No problems found
```

**Stylelint - Con errores:**
```
src/app/components/home/home.component.css
  15:3  ✖  Expected indentation of 2 spaces  (indentation)
  20:5  ✖  Unexpected duplicate selector     (no-duplicate-selectors)
```

---

## 7. Ejecución Automatizada

### 7.1 Activación en GitHub

Una vez que el workflow está configurado y el código está en GitHub:

1. **Push a una rama**: Al hacer push, el workflow se ejecuta automáticamente
2. **Crear Pull Request**: Al crear un PR, se ejecutan los checks
3. **Ver resultados**: Los resultados aparecen en la pestaña "Actions" y en el PR

### 7.2 Verificación en Pull Requests

Cuando creas un Pull Request:

1. GitHub ejecuta automáticamente el workflow
2. Los checks aparecen en la parte inferior del PR
3. Si todos los checks pasan, verás ✅
4. Si hay errores, verás ❌ y podrás ver los detalles

### 7.3 Requisitos para Merge

**Recomendación**: Configurar branch protection rules para requerir que los checks pasen antes de hacer merge.

**Configuración sugerida:**

1. Ve a **Settings** → **Branches**
2. Agrega una regla para `main` o `master`
3. Marca "Require status checks to pass before merging"
4. Selecciona los checks: `lint-frontend` y `lint-backend`

---

## 8. Mejores Prácticas

### 8.1 Para Desarrolladores

✅ **Ejecutar linting antes de commit**: Siempre ejecuta `npm run lint:all` antes de hacer commit  
✅ **Corregir errores automáticamente**: Usa `npm run lint:fix` cuando sea posible  
✅ **Revisar errores manualmente**: Algunos errores requieren corrección manual  
✅ **Mantener consistencia**: Sigue las reglas configuradas para mantener el código uniforme  

### 8.2 Para el Equipo

✅ **Revisar PRs**: Siempre revisa los checks de linting en los Pull Requests  
✅ **No ignorar errores**: Corrige los errores de linting antes de hacer merge  
✅ **Actualizar configuración**: Si es necesario, actualiza las reglas de linting en consenso con el equipo  
✅ **Documentar cambios**: Si cambias reglas de linting, documenta el cambio y la razón  

### 8.3 Mantenimiento

✅ **Actualizar herramientas**: Mantén las herramientas de linting actualizadas  
✅ **Revisar reglas**: Revisa periódicamente las reglas para asegurar que sean apropiadas  
✅ **Optimizar performance**: Si el linting es lento, considera excluir ciertas carpetas  

---

## 9. Solución de Problemas

### 9.1 Errores Comunes

#### Error: "htmlhint: command not found"

**Solución:**
```bash
cd frontend
npm install
```

#### Error: "stylelint: command not found"

**Solución:**
```bash
cd frontend
npm install
```

#### Error: "eslint: command not found"

**Solución:**
```bash
cd backend
npm install
```

#### Error: "No files matching the pattern"

**Solución:** Verifica que los archivos existan en la ruta especificada y que la extensión sea correcta (.html, .css, .js)

### 9.2 Ignorar Archivos

Si necesitas ignorar ciertos archivos, puedes agregarlos a los archivos de configuración:

**HTMLHint** (`.htmlhintrc`):
- No hay opción de ignorar, pero puedes excluir carpetas en el comando: `htmlhint 'src/**/*.html' --ignore 'src/assets/**'`

**Stylelint** (`.stylelintrc.json`):
```json
{
  "ignoreFiles": [
    "**/*.min.css",
    "**/node_modules/**",
    "**/dist/**"
  ]
}
```

**ESLint** (`.eslintrc.json`):
```json
{
  "ignorePatterns": [
    "node_modules/**",
    "dist/**",
    "*.min.js"
  ]
}
```

---

## 10. Conclusión

Este sistema de automatización de pruebas asegura que el código HTML y CSS cumpla con las mejores prácticas establecidas. La integración con GitHub Actions permite detectar problemas automáticamente antes de que lleguen a la rama principal, mejorando la calidad del código y la experiencia de desarrollo.

### Beneficios Implementados

✅ **Detección temprana de errores**  
✅ **Consistencia en el código**  
✅ **Automatización completa**  
✅ **Integración con GitHub**  
✅ **Documentación clara**  

---

## 11. Referencias

- [HTMLHint Documentation](https://htmlhint.com/)
- [Stylelint Documentation](https://stylelint.io/)
- [ESLint Documentation](https://eslint.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Última actualización**: Enero 2025  
**Versión del documento**: 1.0  
**Proyecto**: Hell House



# 📸 Guía para Obtener Evidencias del Despliegue
## Hell House Chronicles - GitHub Pages

---

## 🎯 Objetivo

Este documento te guía paso a paso para obtener las evidencias necesarias que demuestran:
1. ✅ Automatización de pruebas
2. ✅ Despliegue automatizado con GitHub Actions
3. ✅ Documentos necesarios para la automatización

---

## 1. Evidencia de Automatización de Pruebas

### 1.1 Ubicación de la Evidencia

**URL:** `https://github.com/[TU-USUARIO]/Integradora/actions`

### 1.2 Pasos para Obtener la Evidencia

1. **Ve a tu repositorio en GitHub**
   - Navega a: `https://github.com/[TU-USUARIO]/Integradora`

2. **Abre la pestaña Actions**
   - Click en la pestaña **Actions** en la parte superior del repositorio

3. **Selecciona un workflow ejecutado**
   - Verás dos workflows:
     - **"Linting Tests"** (pruebas de linting)
     - **"Deploy to GitHub Pages"** (despliegue)

4. **Para evidencias de pruebas:**
   - Click en **"Linting Tests"**
   - Selecciona la ejecución más reciente
   - Verás 3 jobs:
     - ✅ `lint-frontend` (HTML y CSS)
     - ✅ `lint-backend` (JavaScript)
     - ✅ `lint-all` (Reporte completo)

5. **Captura de pantalla recomendada:**
   - Captura la vista completa del workflow
   - Debe mostrar los checkmarks verdes ✅
   - Incluye la fecha y hora de ejecución

### 1.3 Qué Buscar en la Evidencia

**En el workflow "Linting Tests":**
- ✅ Job `lint-frontend` con estado "success"
- ✅ Job `lint-backend` con estado "success"
- ✅ Job `lint-all` con estado "success"
- ✅ Mensajes como "Scanned 7 files, no errors found"
- ✅ Mensajes como "No problems found"

**En el workflow "Deploy to GitHub Pages":**
- ✅ Job `test` ejecutándose antes del build
- ✅ Paso "Run HTML linting" con checkmark verde
- ✅ Paso "Run CSS linting" con checkmark verde
- ✅ Paso "Run all linting checks" con checkmark verde

### 1.4 Ejemplo de Salida Esperada

```
✓ Run HTML linting
  Scanned 7 files, no errors found (51 ms)

✓ Run CSS linting
  No problems found

✓ Run all linting checks
  All checks passed
```

---

## 2. Evidencia de Despliegue Automatizado

### 2.1 Ubicación de la Evidencia

**URL:** `https://github.com/[TU-USUARIO]/Integradora/actions`

### 2.2 Pasos para Obtener la Evidencia

1. **Ve a la pestaña Actions**
   - Click en **Actions** en tu repositorio

2. **Selecciona "Deploy to GitHub Pages"**
   - En la lista de workflows, busca **"Deploy to GitHub Pages"**
   - Click en el workflow

3. **Selecciona la ejecución más reciente**
   - Verás una lista de ejecuciones
   - Selecciona la más reciente (arriba de la lista)

4. **Verifica los 3 jobs:**
   - ✅ **test** - Debe estar en verde (success)
   - ✅ **build** - Debe estar en verde (success)
   - ✅ **deploy** - Debe estar en verde (success)

5. **Captura de pantalla recomendada:**
   - Captura la vista completa mostrando los 3 jobs
   - Incluye los tiempos de ejecución
   - Incluye la fecha y hora

### 2.3 Detalles a Capturar

**Job: test**
- Tiempo de ejecución: ~2-3 minutos
- Pasos visibles:
  - ✓ Checkout code
  - ✓ Setup Node.js
  - ✓ Install dependencies
  - ✓ Run HTML linting
  - ✓ Run CSS linting
  - ✓ Run all linting checks

**Job: build**
- Tiempo de ejecución: ~3-5 minutos
- Pasos visibles:
  - ✓ Checkout code
  - ✓ Setup Node.js
  - ✓ Install dependencies
  - ✓ Build Angular application
  - ✓ Upload build artifacts

**Job: deploy**
- Tiempo de ejecución: ~1-2 minutos
- Pasos visibles:
  - ✓ Checkout code
  - ✓ Download build artifacts
  - ✓ Setup Pages
  - ✓ Upload artifact
  - ✓ Deploy to GitHub Pages

### 2.4 Evidencia de la URL Desplegada

1. **Ve a Settings → Pages**
   - En tu repositorio, ve a **Settings**
   - Click en **Pages** en el menú lateral
   - Verás: **"Your site is live at https://[usuario].github.io/Integradora/"**

2. **Captura de pantalla:**
   - Captura la sección que muestra la URL
   - Incluye el mensaje "Your site is live at..."

3. **Evidencia de la página funcionando:**
   - Abre la URL en tu navegador
   - Captura la página cargando correctamente
   - Debe mostrar la aplicación Hell House Chronicles

---

## 3. Evidencia de Documentos Necesarios

### 3.1 Lista de Archivos a Mostrar

Crea capturas de pantalla o lista los siguientes archivos:

#### 3.1.1 Workflows de GitHub Actions

**Ubicación:** `.github/workflows/`

1. **deploy.yml**
   - Muestra el contenido del archivo
   - O muestra la estructura del archivo en GitHub

2. **lint.yml**
   - Muestra el contenido del archivo
   - O muestra la estructura del archivo en GitHub

#### 3.1.2 Archivos de Configuración

**En la raíz del proyecto:**
- `.htmlhintrc`
- `.stylelintrc.json`
- `.eslintrc.json`

**En frontend/:**
- `package.json` (mostrar los scripts de linting)
- `angular.json` (mostrar la configuración de build)
- `src/environments/environment.prod.ts`

### 3.2 Cómo Mostrar los Archivos

**Opción 1: Capturas de pantalla en GitHub**
- Ve a cada archivo en GitHub
- Captura la pantalla mostrando el contenido

**Opción 2: Lista de archivos**
- Crea una lista con la estructura de archivos
- Incluye una breve descripción de cada uno

**Opción 3: Comando tree (terminal)**
```bash
tree -L 3 -I 'node_modules' .github frontend/src/environments
```

---

## 4. Código QR (Opcional)

### 4.1 Generar el Código QR

1. **Obtén la URL de tu página:**
   ```
   https://[TU-USUARIO].github.io/Integradora/
   ```

2. **Genera el QR:**
   - Ve a: https://www.qr-code-generator.com/
   - O: https://qr-code-generator.com/
   - Pega la URL
   - Genera el código QR
   - Descarga la imagen

3. **Incluye el QR en tu documentación:**
   - Agrega la imagen del QR
   - Incluye la URL debajo del QR

### 4.2 Ejemplo de Presentación

```
┌─────────────────┐
│                 │
│   [QR CODE]     │
│                 │
└─────────────────┘

https://[usuario].github.io/Integradora/
```

---

## 5. Checklist de Evidencias

### 5.1 Evidencias Mínimas Requeridas

- [ ] Captura de pantalla del workflow "Linting Tests" ejecutándose
- [ ] Captura de pantalla del workflow "Deploy to GitHub Pages" ejecutándose
- [ ] Captura de pantalla mostrando los 3 jobs (test, build, deploy) en verde
- [ ] Captura de pantalla de Settings → Pages mostrando la URL
- [ ] Captura de pantalla de la página funcionando en el navegador
- [ ] Lista o capturas de los archivos de configuración
- [ ] (Opcional) Código QR con la URL

### 5.2 Evidencias Adicionales Recomendadas

- [ ] Logs detallados del job `test` mostrando las pruebas pasando
- [ ] Logs detallados del job `build` mostrando la compilación
- [ ] Logs detallados del job `deploy` mostrando el despliegue
- [ ] Captura de pantalla del historial de ejecuciones en Actions

---

## 6. Organización de las Evidencias

### 6.1 Estructura Recomendada

Crea una carpeta o documento con:

```
Evidencias/
├── 1_Automatizacion_Pruebas/
│   ├── workflow_linting_tests.png
│   ├── job_lint_frontend.png
│   └── job_lint_backend.png
├── 2_Despliegue_Automatizado/
│   ├── workflow_deploy.png
│   ├── job_test.png
│   ├── job_build.png
│   ├── job_deploy.png
│   └── settings_pages.png
├── 3_Documentos_Necesarios/
│   ├── estructura_archivos.png
│   ├── deploy_yml.png
│   └── configuraciones.png
└── 4_Pagina_Desplegada/
    ├── url_pages.png
    ├── pagina_funcionando.png
    └── qr_code.png (opcional)
```

### 6.2 Formato de Presentación

**Opción 1: Documento Word/PowerPoint**
- Incluye todas las capturas organizadas
- Agrega descripciones breves
- Incluye el código QR al final

**Opción 2: Documento Markdown**
- Crea un archivo `EVIDENCIAS.md`
- Incluye las imágenes
- Agrega descripciones

**Opción 3: Carpeta con imágenes**
- Organiza las capturas en carpetas
- Crea un índice en un documento

---

## 7. Ejemplo de Descripción para Cada Evidencia

### 7.1 Evidencia de Pruebas

**Título:** "Automatización de Pruebas - Workflow Linting Tests"

**Descripción:**
"Esta captura muestra el workflow 'Linting Tests' ejecutándose automáticamente en GitHub Actions. Se pueden observar tres jobs ejecutándose: lint-frontend (HTML y CSS), lint-backend (JavaScript), y lint-all (reporte completo). Todos los jobs muestran estado 'success' (verde), indicando que todas las pruebas de linting pasaron correctamente."

### 7.2 Evidencia de Despliegue

**Título:** "Despliegue Automatizado - Workflow Deploy to GitHub Pages"

**Descripción:**
"Esta captura muestra el workflow 'Deploy to GitHub Pages' ejecutándose automáticamente. El proceso consta de tres jobs en secuencia: test (pruebas automatizadas), build (compilación de Angular), y deploy (despliegue a GitHub Pages). Todos los jobs completaron exitosamente, demostrando que el despliegue se realizó de forma automatizada sin intervención manual."

### 7.3 Evidencia de Documentos

**Título:** "Archivos de Configuración para Automatización"

**Descripción:**
"Esta lista muestra los archivos necesarios para la automatización del despliegue. Incluye los workflows de GitHub Actions (.github/workflows/), archivos de configuración de linting (.htmlhintrc, .stylelintrc.json), y archivos de configuración de Angular (angular.json, package.json, environment.prod.ts)."

---

## 8. Enlaces Rápidos

- **Repositorio:** `https://github.com/[TU-USUARIO]/Integradora`
- **Actions:** `https://github.com/[TU-USUARIO]/Integradora/actions`
- **Página Desplegada:** `https://[TU-USUARIO].github.io/Integradora/`
- **Settings → Pages:** `https://github.com/[TU-USUARIO]/Integradora/settings/pages`

---

**¡Listo!** Con estas evidencias podrás demostrar completamente el proceso de despliegue automatizado a GitHub Pages.

---

*Última actualización: Noviembre 2025*




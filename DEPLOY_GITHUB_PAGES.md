# 🚀 Documentación de Despliegue a GitHub Pages
## Hell House Chronicles

---

**Versión del Documento:** 1.0  
**Fecha de Creación:** Noviembre 2025  
**Última Actualización:** Noviembre 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Proceso de Despliegue Automatizado](#proceso-de-despliegue-automatizado)
4. [Evidencia de Automatización de Pruebas](#evidencia-de-automatización-de-pruebas)
5. [Evidencia de Despliegue Automatizado](#evidencia-de-despliegue-automatizado)
6. [Documentos Necesarios para Automatización](#documentos-necesarios-para-automatización)
7. [Configuración de GitHub Pages](#configuración-de-github-pages)
8. [Solución de Problemas](#solución-de-problemas)
9. [Enlaces y Recursos](#enlaces-y-recursos)

---

## 1. Introducción

Este documento describe el proceso completo de despliegue automatizado de la aplicación **Hell House Chronicles** a **GitHub Pages** utilizando **GitHub Actions**. El proceso incluye:

- ✅ Ejecución automática de pruebas (linting)
- ✅ Build automatizado de la aplicación Angular
- ✅ Despliegue automático a GitHub Pages
- ✅ Activación en cada push a la rama principal

### 1.1 Arquitectura del Despliegue

```
┌─────────────────────────────────────────────────────────┐
│  Push a main/master                                     │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  GitHub Actions Workflow (deploy.yml)                    │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐    ┌──────────────────┐
│ Job: test    │───▶│ Job: build       │
│ (Linting)    │    │ (Angular Build)  │
└──────────────┘    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Job: deploy      │
                    │ (GitHub Pages)   │
                    └──────────────────┘
```

---

## 2. Requisitos Previos

### 2.1 Configuración del Repositorio

- ✅ Repositorio en GitHub (público o privado con GitHub Pro)
- ✅ Rama principal: `main` o `master`
- ✅ Permisos de escritura en el repositorio

### 2.2 Configuración de GitHub Pages

1. Ve a **Settings** → **Pages** en tu repositorio
2. En **Source**, selecciona: **GitHub Actions**
3. Guarda los cambios

### 2.3 Archivos Necesarios en el Repositorio

- ✅ `.github/workflows/deploy.yml` - Workflow de despliegue
- ✅ `.github/workflows/lint.yml` - Workflow de pruebas (ya existe)
- ✅ `frontend/package.json` - Dependencias del frontend
- ✅ `frontend/angular.json` - Configuración de Angular
- ✅ Archivos de configuración de linting (`.htmlhintrc`, `.stylelintrc.json`)

---

## 3. Proceso de Despliegue Automatizado

### 3.1 Flujo Completo del Proceso

El despliegue se ejecuta automáticamente cuando:

1. **Push a la rama principal** (`main` o `master`)
2. **Ejecución manual** desde la pestaña Actions

### 3.2 Pasos del Workflow

#### **Paso 1: Job de Pruebas (test)**

```yaml
Job: test
├── Checkout del código
├── Setup de Node.js 20
├── Instalación de dependencias (npm ci)
├── Ejecución de linting HTML
├── Ejecución de linting CSS
└── Upload de resultados de pruebas
```

**Duración estimada:** 2-3 minutos

#### **Paso 2: Job de Build (build)**

```yaml
Job: build (solo si test pasa)
├── Checkout del código
├── Setup de Node.js 20
├── Instalación de dependencias
├── Build de Angular (producción)
│   └── Base href: /Integradora/
└── Upload de artefactos de build
```

**Duración estimada:** 3-5 minutos

#### **Paso 3: Job de Despliegue (deploy)**

```yaml
Job: deploy (solo si build pasa)
├── Checkout del código
├── Download de artefactos de build
├── Setup de GitHub Pages
├── Upload de artefactos a Pages
└── Despliegue a GitHub Pages
```

**Duración estimada:** 1-2 minutos

**Tiempo total estimado:** 6-10 minutos

---

## 4. Evidencia de Automatización de Pruebas

### 4.1 Workflow de Pruebas Automatizadas

El proyecto incluye un workflow dedicado para pruebas automatizadas ubicado en:

**Archivo:** `.github/workflows/lint.yml`

### 4.2 Pruebas Ejecutadas

#### 4.2.1 Linting de HTML (HTMLHint)

**Herramienta:** HTMLHint 1.1.4  
**Configuración:** `.htmlhintrc`  
**Comando:** `npm run lint:html`

**Reglas verificadas:**
- ✅ Nombres de etiquetas en minúsculas
- ✅ Valores de atributos con comillas dobles
- ✅ Etiquetas correctamente cerradas
- ✅ IDs únicos
- ✅ Atributo `alt` en imágenes
- ✅ Sin atributos duplicados

**Ejemplo de salida exitosa:**
```
Scanned 7 files, no errors found (51 ms)
```

#### 4.2.2 Linting de CSS (Stylelint)

**Herramienta:** Stylelint 15.11.0  
**Configuración:** `.stylelintrc.json`  
**Comando:** `npm run lint:css`

**Reglas verificadas:**
- ✅ Sin selectores duplicados
- ✅ Punto y coma final requerido
- ✅ Espaciado correcto en declaraciones
- ✅ Formato consistente

**Ejemplo de salida exitosa:**
```
No problems found
```

#### 4.2.3 Linting Completo

**Comando:** `npm run lint:all`

Ejecuta ambos linters (HTML y CSS) en secuencia. El workflow falla si alguna prueba no pasa.

### 4.3 Integración en el Workflow de Despliegue

Las pruebas automatizadas se ejecutan **antes** del build en el job `test`:

```yaml
- name: Run HTML linting
  working-directory: ./frontend
  run: npm run lint:html
  continue-on-error: false  # Falla el workflow si hay errores

- name: Run CSS linting
  working-directory: ./frontend
  run: npm run lint:css
  continue-on-error: false

- name: Run all linting checks
  working-directory: ./frontend
  run: npm run lint:all
  continue-on-error: false
```

### 4.4 Evidencia Visual

**Ubicación de evidencia:**
- Pestaña **Actions** en GitHub
- Seleccionar el workflow ejecutado
- Ver el job `test` con checkmarks verdes ✅

**Ejemplo de salida en GitHub Actions:**

```
✓ Run HTML linting
  Scanned 7 files, no errors found

✓ Run CSS linting
  No problems found

✓ Run all linting checks
  All checks passed
```

---

## 5. Evidencia de Despliegue Automatizado

### 5.1 Workflow de Despliegue

**Archivo:** `.github/workflows/deploy.yml`

### 5.2 Activación Automática

El despliegue se activa automáticamente cuando:

1. **Push a rama principal:**
   ```yaml
   on:
     push:
       branches:
         - main
         - master
   ```

2. **Ejecución manual:**
   ```yaml
   workflow_dispatch:
   ```
   - Ve a **Actions** → **Deploy to GitHub Pages** → **Run workflow**

### 5.3 Proceso de Despliegue

#### 5.3.1 Dependencias entre Jobs

```
test → build → deploy
```

- El job `build` solo se ejecuta si `test` pasa ✅
- El job `deploy` solo se ejecuta si `build` pasa ✅

#### 5.3.2 Build de Producción

```bash
npm run build -- --configuration production --base-href /Integradora/
```

**Parámetros importantes:**
- `--configuration production`: Build optimizado
- `--base-href /Integradora/`: Ruta base para GitHub Pages

#### 5.3.3 Despliegue a GitHub Pages

El workflow utiliza la acción oficial de GitHub:

```yaml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

### 5.4 Evidencia Visual del Despliegue

**Ubicación:**
1. Ve a **Actions** en tu repositorio
2. Selecciona el workflow **"Deploy to GitHub Pages"**
3. Verás los 3 jobs ejecutándose en secuencia:

```
✓ test (2m 15s)
  ✓ Run HTML linting
  ✓ Run CSS linting
  ✓ Run all linting checks

✓ build (4m 32s)
  ✓ Install dependencies
  ✓ Build Angular application
  ✓ Upload build artifacts

✓ deploy (1m 48s)
  ✓ Setup Pages
  ✓ Upload artifact
  ✓ Deploy to GitHub Pages
```

### 5.5 URL de la Página Desplegada

Una vez desplegado, la página estará disponible en:

```
https://[TU-USUARIO].github.io/Integradora/
```

**Ejemplo:**
```
https://ian-charles.github.io/Integradora/
```

### 5.6 Verificación del Despliegue

1. **En GitHub:**
   - Ve a **Settings** → **Pages**
   - Verás: "Your site is live at https://..."

2. **En el navegador:**
   - Abre la URL de GitHub Pages
   - Verifica que la aplicación carga correctamente

---

## 6. Documentos Necesarios para Automatización

### 6.1 Archivos de Configuración de GitHub Actions

#### 6.1.1 `.github/workflows/deploy.yml`

**Descripción:** Workflow principal de despliegue

**Contenido:**
- Triggers (push, manual)
- Permisos necesarios
- Jobs: test, build, deploy
- Configuración de cada paso

**Ubicación:** `.github/workflows/deploy.yml`

#### 6.1.2 `.github/workflows/lint.yml`

**Descripción:** Workflow de pruebas automatizadas (ya existe)

**Contenido:**
- Linting de frontend (HTML, CSS)
- Linting de backend (JavaScript)
- Reportes de resultados

**Ubicación:** `.github/workflows/lint.yml`

### 6.2 Archivos de Configuración de Linting

#### 6.2.1 `.htmlhintrc`

**Descripción:** Configuración de HTMLHint

**Contenido:**
```json
{
  "tagname-lowercase": true,
  "attr-value-double-quotes": true,
  "tag-pair": true,
  "id-unique": true,
  "alt-require": true,
  ...
}
```

**Ubicación:** Raíz del proyecto

#### 6.2.2 `.stylelintrc.json`

**Descripción:** Configuración de Stylelint

**Contenido:**
```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended"
  ],
  "rules": { ... }
}
```

**Ubicación:** Raíz del proyecto

#### 6.2.3 `.eslintrc.json`

**Descripción:** Configuración de ESLint (para backend)

**Ubicación:** Raíz del proyecto

### 6.3 Archivos de Configuración de Angular

#### 6.3.1 `frontend/angular.json`

**Descripción:** Configuración del proyecto Angular

**Configuraciones importantes:**
- `outputPath`: `dist/frontend`
- `baseHref`: Configurado en el comando de build
- Configuraciones de producción y desarrollo

**Ubicación:** `frontend/angular.json`

#### 6.3.2 `frontend/package.json`

**Descripción:** Dependencias y scripts del frontend

**Scripts importantes:**
- `lint:html`: Ejecuta HTMLHint
- `lint:css`: Ejecuta Stylelint
- `lint:all`: Ejecuta ambos
- `build`: Build de producción

**Ubicación:** `frontend/package.json`

#### 6.3.3 `frontend/src/environments/environment.prod.ts`

**Descripción:** Variables de entorno para producción

**Contenido:**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-backend.com/api'
};
```

**Ubicación:** `frontend/src/environments/environment.prod.ts`

### 6.4 Archivos de Configuración de TypeScript

#### 6.4.1 `frontend/tsconfig.json`

**Descripción:** Configuración base de TypeScript

**Ubicación:** `frontend/tsconfig.json`

#### 6.4.2 `frontend/tsconfig.app.json`

**Descripción:** Configuración de TypeScript para la aplicación

**Ubicación:** `frontend/tsconfig.app.json`

### 6.5 Resumen de Archivos Necesarios

```
Integradora/
├── .github/
│   └── workflows/
│       ├── deploy.yml          ← Workflow de despliegue
│       └── lint.yml            ← Workflow de pruebas (ya existe)
├── .htmlhintrc                 ← Configuración HTMLHint
├── .stylelintrc.json           ← Configuración Stylelint
├── .eslintrc.json              ← Configuración ESLint
└── frontend/
    ├── angular.json             ← Configuración Angular
    ├── package.json             ← Dependencias y scripts
    ├── tsconfig.json            ← Configuración TypeScript
    ├── tsconfig.app.json        ← Configuración TypeScript app
    └── src/
        └── environments/
            └── environment.prod.ts  ← Variables de producción
```

---

## 7. Configuración de GitHub Pages

### 7.1 Pasos de Configuración Inicial

1. **Ir a Settings del repositorio:**
   - Navega a tu repositorio en GitHub
   - Click en **Settings**

2. **Configurar Pages:**
   - En el menú lateral, click en **Pages**
   - En **Source**, selecciona: **GitHub Actions**
   - Guarda los cambios

3. **Verificar permisos:**
   - Asegúrate de tener permisos de escritura
   - Los workflows necesitan permisos para desplegar

### 7.2 Configuración del Base Href

Para que Angular funcione correctamente en GitHub Pages, el `base-href` debe coincidir con el nombre del repositorio:

```bash
--base-href /Integradora/
```

**Nota:** Si tu repositorio tiene otro nombre, cambia `/Integradora/` por `/[TU-REPOSITORIO]/`

### 7.3 Configuración de la URL del Backend

En producción, el backend debe estar desplegado en otro servicio (Railway, Render, Heroku, etc.).

Actualiza `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-en-produccion.com/api'
};
```

---

## 8. Solución de Problemas

### 8.1 Problemas Comunes

#### Problema: "Workflow no se ejecuta"

**Solución:**
- Verifica que el archivo esté en `.github/workflows/deploy.yml`
- Verifica que la rama sea `main` o `master`
- Verifica permisos en Settings → Actions → General

#### Problema: "Las pruebas fallan"

**Solución:**
- Ejecuta `npm run lint:all` localmente
- Corrige los errores reportados
- Haz commit y push

#### Problema: "Build falla"

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Verifica que `angular.json` esté configurado correctamente
- Revisa los logs del job `build` en Actions

#### Problema: "Despliegue falla"

**Solución:**
- Verifica que GitHub Pages esté configurado (Settings → Pages)
- Verifica que el source sea "GitHub Actions"
- Verifica permisos del workflow

#### Problema: "La página no carga correctamente"

**Solución:**
- Verifica el `base-href` en el comando de build
- Debe coincidir con el nombre del repositorio
- Verifica que los assets estén en la ruta correcta

### 8.2 Verificación de Logs

1. Ve a **Actions** en GitHub
2. Selecciona el workflow ejecutado
3. Click en el job que falló
4. Revisa los logs para identificar el error

---

## 9. Enlaces y Recursos

### 9.1 Enlaces del Proyecto

- **Repositorio:** https://github.com/[TU-USUARIO]/Integradora
- **Página Desplegada:** https://[TU-USUARIO].github.io/Integradora/
- **Workflows:** https://github.com/[TU-USUARIO]/Integradora/actions

### 9.2 Documentación Oficial

- **GitHub Actions:** https://docs.github.com/en/actions
- **GitHub Pages:** https://docs.github.com/en/pages
- **Angular Deployment:** https://angular.io/guide/deployment
- **HTMLHint:** https://htmlhint.com/
- **Stylelint:** https://stylelint.io/

### 9.3 Código QR (Opcional)

Una vez desplegado, puedes generar un código QR con la URL de tu página usando herramientas como:

- https://www.qr-code-generator.com/
- https://qr-code-generator.com/

**Ejemplo de URL para QR:**
```
https://[TU-USUARIO].github.io/Integradora/
```

---

## 10. Checklist de Despliegue

### 10.1 Antes del Primer Despliegue

- [ ] Repositorio creado en GitHub
- [ ] Código subido al repositorio
- [ ] Archivo `.github/workflows/deploy.yml` creado
- [ ] GitHub Pages configurado (Settings → Pages → Source: GitHub Actions)
- [ ] `base-href` configurado correctamente en el workflow
- [ ] `environment.prod.ts` actualizado con URL del backend

### 10.2 Verificación Post-Despliegue

- [ ] Workflow ejecutado exitosamente (Actions → Deploy to GitHub Pages)
- [ ] Todos los jobs pasaron (test ✅, build ✅, deploy ✅)
- [ ] Página accesible en la URL de GitHub Pages
- [ ] Aplicación carga correctamente
- [ ] Assets (imágenes, CSS) cargan correctamente
- [ ] Enlaces y navegación funcionan

---

## 11. Ejemplo de Ejecución Exitosa

### 11.1 Logs del Workflow

```
Run #42 - Deploy to GitHub Pages

✓ test (2m 15s)
  ✓ Checkout code
  ✓ Setup Node.js
  ✓ Install dependencies
  ✓ Run HTML linting
    Scanned 7 files, no errors found
  ✓ Run CSS linting
    No problems found
  ✓ Run all linting checks
    All checks passed

✓ build (4m 32s)
  ✓ Checkout code
  ✓ Setup Node.js
  ✓ Install dependencies
  ✓ Build Angular application
    ✔ Browser application bundle generation complete.
  ✓ Upload build artifacts

✓ deploy (1m 48s)
  ✓ Checkout code
  ✓ Download build artifacts
  ✓ Setup Pages
  ✓ Upload artifact
  ✓ Deploy to GitHub Pages
    Deployment successful
    Your site is live at https://[usuario].github.io/Integradora/
```

### 11.2 Estado Final

- ✅ **Pruebas:** Pasadas
- ✅ **Build:** Exitoso
- ✅ **Despliegue:** Completado
- ✅ **URL:** https://[usuario].github.io/Integradora/

---

**Fin del Documento**

---

*Este documento describe el proceso completo de despliegue automatizado a GitHub Pages. Para más información, consulta la documentación oficial de GitHub Actions y GitHub Pages.*




# 📋 PASOS DETALLADOS PARA LA ENTREGA

## 🎯 OBJETIVO
Esta guía te dice EXACTAMENTE qué hacer, paso por paso, sin saltarte nada.

---

## 📸 PARTE 1: CAPTURAS DE PANTALLA

### CAPTURA 1: GitHub Actions Funcionando

**Paso 1.1:** Abre tu navegador (Chrome, Edge, etc.)

**Paso 1.2:** Ve a esta dirección:
```
https://github.com/charls-png/HellHouse
```

**Paso 1.3:** En la parte superior de la página, verás varias pestañas:
- Code
- Issues
- Pull requests
- **Actions** ← Haz clic aquí

**Paso 1.4:** Ahora verás una lista de "workflows" (ejecuciones). Deberías ver algo como:
- "Linting Tests #1" (o #2, #3, etc.)
- Con un círculo verde ✅ o amarillo ⏳

**Paso 1.5:** Haz clic en el más reciente (el que está arriba)

**Paso 1.6:** En la página que se abre, verás 3 "jobs" (trabajos):
- Lint Frontend (HTML & CSS) - con ✅ verde
- Lint Backend (JavaScript) - con ✅ verde  
- Complete Linting Report - con ✅ verde

**Paso 1.7:** Toma captura de pantalla de toda esta página
- Presiona `Windows + Shift + S` (o `Print Screen`)
- Selecciona toda la pantalla
- La captura se guarda en el portapapeles o en "Capturas"

**Paso 1.8:** Guarda la captura como: `01-github-actions.png`

---

### CAPTURA 2: Detalles del Linting

**Paso 2.1:** En la misma página del workflow (la que abriste en el paso 1.5)

**Paso 2.2:** Haz clic en "Lint Frontend (HTML & CSS)" (el primer job con ✅ verde)

**Paso 2.3:** Verás una lista de pasos. Busca:
- "Run HTML linting" o "Run CSS linting"
- Debería tener un ✅ verde

**Paso 2.4:** Haz clic en ese paso para expandirlo

**Paso 2.5:** Verás texto que dice algo como:
- "Running HTML linting..."
- "Scanned 7 files, no errors found"

**Paso 2.6:** Toma captura de pantalla de esta sección

**Paso 2.7:** Guarda como: `02-linting-details.png`

---

### CAPTURA 3: Estructura del Proyecto

**Paso 3.1:** Abre Visual Studio Code (o tu editor de código)

**Paso 3.2:** Abre la carpeta del proyecto:
- File → Open Folder
- Selecciona: `C:\Users\ian_h\Integradora`

**Paso 3.3:** En la barra lateral izquierda, verás la estructura de carpetas

**Paso 3.4:** Expande las carpetas principales:
- `.github` → `workflows`
- `frontend` → `src` → `app` → `components`
- `backend` → `src`
- También deberías ver archivos en la raíz como `.htmlhintrc`

**Paso 3.5:** Asegúrate de que se vean al menos estas carpetas:
- `.github/workflows/`
- `frontend/src/app/components/`
- `backend/src/`
- Archivos `.htmlhintrc`, `.stylelintrc.json` en la raíz

**Paso 3.6:** Toma captura de pantalla de la estructura

**Paso 3.7:** Guarda como: `03-estructura-proyecto.png`

---

### CAPTURA 4: Linting Local - Frontend

**Paso 4.1:** Abre PowerShell (o Terminal)

**Paso 4.2:** Escribe este comando (copia y pega):
```powershell
cd C:\Users\ian_h\Integradora\frontend
```

**Paso 4.3:** Presiona Enter

**Paso 4.4:** Ahora escribe:
```powershell
npm run lint:all
```

**Paso 4.5:** Presiona Enter

**Paso 4.6:** Espera unos segundos. Verás algo como:
```
> frontend@0.0.0 lint:all
> npm run lint:html && npm run lint:css

> frontend@0.0.0 lint:html
> htmlhint src/**/*.html

Scanned 7 files, no errors found (77 ms)

> frontend@0.0.7 lint:css
> stylelint src/**/*.css

(Debería mostrar que no hay errores)
```

**Paso 4.7:** Toma captura de pantalla de toda la ventana de PowerShell

**Paso 4.8:** Guarda como: `04-linting-frontend.png`

---

### CAPTURA 5: Linting Local - Backend

**Paso 5.1:** En la misma ventana de PowerShell

**Paso 5.2:** Escribe:
```powershell
cd ..\backend
```

**Paso 5.3:** Presiona Enter

**Paso 5.4:** Escribe:
```powershell
npm run lint
```

**Paso 5.5:** Presiona Enter

**Paso 5.6:** Verás algo como:
```
> hellhouse-backend@1.0.0 lint
> eslint src/**/*.js

(Debería mostrar warnings pero no errores)
```

**Paso 5.7:** Toma captura de pantalla

**Paso 5.8:** Guarda como: `05-linting-backend.png`

---

## 📄 PARTE 2: COPIAR ARCHIVOS DE CONFIGURACIÓN

### ARCHIVO 1: .htmlhintrc

**Paso 6.1:** En Visual Studio Code, abre la carpeta del proyecto

**Paso 6.2:** En la barra lateral, busca el archivo `.htmlhintrc`

**Paso 6.3:** Haz clic en el archivo para abrirlo

**Paso 6.4:** Selecciona TODO el contenido:
- Presiona `Ctrl + A` (seleccionar todo)

**Paso 6.5:** Copia el contenido:
- Presiona `Ctrl + C`

**Paso 6.6:** Abre Bloc de notas (Notepad) o Word

**Paso 6.7:** Pega el contenido:
- Presiona `Ctrl + V`

**Paso 6.8:** Guarda el archivo como: `htmlhintrc.txt`

---

### ARCHIVO 2: .stylelintrc.json

**Paso 7.1:** En Visual Studio Code, busca el archivo `.stylelintrc.json`

**Paso 7.2:** Haz clic para abrirlo

**Paso 7.3:** Selecciona TODO: `Ctrl + A`

**Paso 7.4:** Copia: `Ctrl + C`

**Paso 7.5:** Abre Bloc de notas nuevo

**Paso 7.6:** Pega: `Ctrl + V`

**Paso 7.7:** Guarda como: `stylelintrc.json.txt`

---

### ARCHIVO 3: .eslintrc.json

**Paso 8.1:** En Visual Studio Code, busca el archivo `.eslintrc.json`

**Paso 8.2:** Ábrelo

**Paso 8.3:** Selecciona TODO: `Ctrl + A`

**Paso 8.4:** Copia: `Ctrl + C`

**Paso 8.5:** Abre Bloc de notas nuevo

**Paso 8.6:** Pega: `Ctrl + V`

**Paso 8.7:** Guarda como: `eslintrc.json.txt`

---

### ARCHIVO 4: .github/workflows/lint.yml (MUY IMPORTANTE)

**Paso 9.1:** En Visual Studio Code, busca la carpeta `.github`

**Paso 9.2:** Expándela, luego `workflows`, luego haz clic en `lint.yml`

**Paso 9.3:** Selecciona TODO: `Ctrl + A`

**Paso 9.4:** Copia: `Ctrl + C`

**Paso 9.5:** Abre Bloc de notas nuevo

**Paso 9.6:** Pega: `Ctrl + V`

**Paso 9.7:** Guarda como: `lint.yml.txt`

---

## 📝 PARTE 3: CREAR DOCUMENTO DE ENTREGA

### Paso 10: Abrir Word o crear documento

**Paso 10.1:** Abre Microsoft Word (o Google Docs, o cualquier procesador de texto)

**Paso 10.2:** Crea un nuevo documento

**Paso 10.3:** Guarda como: `Documento_Entrega_Automatizacion.docx`

---

### Paso 11: Agregar Título y Portada

**Paso 11.1:** En la primera línea, escribe:
```
DOCUMENTACIÓN DE AUTOMATIZACIÓN DE PRUEBAS
PROYECTO: HELL HOUSE
```

**Paso 11.2:** Presiona Enter varias veces

**Paso 11.3:** Escribe:
```
Estudiante: [Tu nombre]
Fecha: [Fecha de hoy]
```

---

### Paso 12: Insertar Sección 1 - Resumen

**Paso 12.1:** Escribe:
```
1. RESUMEN EJECUTIVO
```

**Paso 12.2:** Presiona Enter 2 veces

**Paso 12.3:** Abre el archivo `RESUMEN_EJECUTIVO.md` en Visual Studio Code

**Paso 12.4:** Selecciona TODO: `Ctrl + A`

**Paso 12.5:** Copia: `Ctrl + C`

**Paso 12.6:** Vuelve a Word y pega: `Ctrl + V`

---

### Paso 13: Insertar Sección 2 - Capturas

**Paso 13.1:** En Word, escribe:
```
2. EVIDENCIA VISUAL - CAPTURAS DE PANTALLA
```

**Paso 13.2:** Presiona Enter 2 veces

**Paso 13.3:** Escribe:
```
2.1 GitHub Actions Funcionando
```

**Paso 13.4:** Presiona Enter

**Paso 13.5:** En Word, ve a: Insertar → Imágenes → Este dispositivo

**Paso 13.6:** Busca y selecciona: `01-github-actions.png`

**Paso 13.7:** Haz clic en "Insertar"

**Paso 13.8:** Repite para las otras capturas:
- 2.2: `02-linting-details.png`
- 2.3: `03-estructura-proyecto.png`
- 2.4: `04-linting-frontend.png`
- 2.5: `05-linting-backend.png`

---

### Paso 14: Insertar Sección 3 - Documentación Técnica

**Paso 14.1:** En Word, escribe:
```
3. DOCUMENTACIÓN TÉCNICA COMPLETA
```

**Paso 14.2:** Presiona Enter 2 veces

**Paso 14.3:** Abre el archivo `AUTOMATION_DOCUMENTATION.md` en Visual Studio Code

**Paso 14.4:** Selecciona TODO: `Ctrl + A`

**Paso 14.5:** Copia: `Ctrl + C`

**Paso 14.6:** Vuelve a Word y pega: `Ctrl + V`

---

### Paso 15: Insertar Sección 4 - Archivos de Configuración

**Paso 15.1:** En Word, escribe:
```
4. ARCHIVOS DE CONFIGURACIÓN
```

**Paso 15.2:** Presiona Enter 2 veces

**Paso 15.3:** Escribe:
```
4.1 Configuración de HTMLHint (.htmlhintrc)
```

**Paso 15.4:** Presiona Enter

**Paso 15.5:** Abre el archivo `htmlhintrc.txt` que guardaste antes

**Paso 15.6:** Selecciona TODO: `Ctrl + A`

**Paso 15.7:** Copia: `Ctrl + C`

**Paso 15.8:** Vuelve a Word y pega: `Ctrl + V`

**Paso 15.9:** Repite para:
- 4.2: Abre `stylelintrc.json.txt` y pégalo
- 4.3: Abre `eslintrc.json.txt` y pégalo

---

### Paso 16: Insertar Sección 5 - Workflow de GitHub Actions

**Paso 16.1:** En Word, escribe:
```
5. WORKFLOW DE GITHUB ACTIONS
```

**Paso 16.2:** Presiona Enter 2 veces

**Paso 16.3:** Abre el archivo `lint.yml.txt` que guardaste antes

**Paso 16.4:** Selecciona TODO: `Ctrl + A`

**Paso 16.5:** Copia: `Ctrl + C`

**Paso 16.6:** Vuelve a Word y pega: `Ctrl + V`

---

### Paso 17: Insertar Sección 6 - Enlaces

**Paso 17.1:** En Word, escribe:
```
6. ENLACES AL REPOSITORIO
```

**Paso 17.2:** Presiona Enter 2 veces

**Paso 17.3:** Escribe:
```
Repositorio GitHub: https://github.com/charls-png/HellHouse

GitHub Actions: https://github.com/charls-png/HellHouse/actions

Workflow: https://github.com/charls-png/HellHouse/blob/master/.github/workflows/lint.yml
```

---

### Paso 18: Guardar y Revisar

**Paso 18.1:** Guarda el documento: `Ctrl + S`

**Paso 18.2:** Revisa que tengas:
- ✅ Portada con título
- ✅ Resumen ejecutivo
- ✅ 5 capturas de pantalla
- ✅ Documentación técnica completa
- ✅ 3 archivos de configuración
- ✅ Workflow de GitHub Actions
- ✅ Enlaces al repositorio

---

## 📦 PARTE 4: EMPAQUETAR TODO

### Paso 19: Crear Carpeta para Entrega

**Paso 19.1:** Ve al Escritorio (Desktop)

**Paso 19.2:** Clic derecho → Nuevo → Carpeta

**Paso 19.3:** Nombra la carpeta: `Entrega_Automatizacion_Pruebas`

---

### Paso 20: Mover Archivos a la Carpeta

**Paso 20.1:** Abre la carpeta que acabas de crear

**Paso 20.2:** Mueve/copia estos archivos a la carpeta:
- `Documento_Entrega_Automatizacion.docx`
- `01-github-actions.png`
- `02-linting-details.png`
- `03-estructura-proyecto.png`
- `04-linting-frontend.png`
- `05-linting-backend.png`
- `htmlhintrc.txt`
- `stylelintrc.json.txt`
- `eslintrc.json.txt`
- `lint.yml.txt`

---

### Paso 21: Crear ZIP (opcional pero recomendado)

**Paso 21.1:** Clic derecho en la carpeta `Entrega_Automatizacion_Pruebas`

**Paso 21.2:** Selecciona: Enviar a → Carpeta comprimida (en ZIP)

**Paso 21.3:** Se creará un archivo: `Entrega_Automatizacion_Pruebas.zip`

---

## ✅ CHECKLIST FINAL

Antes de entregar, verifica:

- [ ] Tengo 5 capturas de pantalla guardadas
- [ ] Tengo los 4 archivos de texto copiados (.htmlhintrc, .stylelintrc.json, .eslintrc.json, lint.yml)
- [ ] Tengo el documento Word creado con todo
- [ ] El documento tiene todas las secciones
- [ ] Los enlaces están incluidos
- [ ] Todo está en una carpeta
- [ ] (Opcional) Tengo un ZIP creado

---

## 🎯 RESUMEN ULTRA RÁPIDO

1. **5 capturas** → GitHub Actions, detalles, estructura, linting frontend, linting backend
2. **4 archivos** → Copiar contenido de .htmlhintrc, .stylelintrc.json, .eslintrc.json, lint.yml
3. **1 documento Word** → Con resumen, capturas, documentación, archivos, enlaces
4. **Todo en carpeta** → Listo para entregar

---

**¡Sigue estos pasos uno por uno y tendrás todo listo!** 🎉


# 🚀 Pasos para Desplegar a GitHub Pages
## Guía Paso a Paso - Hell House Chronicles

---

## ✅ PASO 1: Verificar que los archivos estén en tu repositorio

### 1.1 Subir los archivos nuevos a GitHub

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Ver qué archivos son nuevos
git status

# Agregar todos los archivos nuevos
git add .

# Hacer commit
git commit -m "Agregar configuración de despliegue a GitHub Pages"

# Subir a GitHub
git push origin main
```

**Nota:** Si tu rama se llama `master` en lugar de `main`, usa:
```bash
git push origin master
```

---

## ✅ PASO 2: Configurar GitHub Pages en tu repositorio

### 2.1 Ir a Settings

1. Ve a tu repositorio en GitHub:
   ```
   https://github.com/[TU-USUARIO]/Integradora
   ```

2. Click en la pestaña **Settings** (Configuración) en la parte superior del repositorio

### 2.2 Configurar Pages

1. En el menú lateral izquierdo, busca y click en **Pages**

2. En la sección **Source** (Origen):
   - **NO** selecciones "Deploy from a branch"
   - **SÍ** selecciona: **GitHub Actions**
   - Si no aparece la opción, espera unos segundos y recarga

3. **Guarda los cambios** (se guardan automáticamente)

### 2.3 Verificar permisos

1. En Settings, ve a **Actions** → **General**

2. En la sección **Workflow permissions**:
   - Selecciona: **Read and write permissions**
   - Marca: **Allow GitHub Actions to create and approve pull requests**

3. Click en **Save** (Guardar)

---

## ✅ PASO 3: Ajustar el nombre del repositorio (si es necesario)

### 3.1 Verificar el nombre de tu repositorio

- Si tu repositorio se llama **"Integradora"** → **NO necesitas cambiar nada**
- Si tu repositorio tiene **otro nombre** → Sigue el paso 3.2

### 3.2 Cambiar el base-href (solo si tu repo tiene otro nombre)

1. Abre el archivo: `.github/workflows/deploy.yml`

2. Busca esta línea (alrededor de la línea 90):
   ```yaml
   run: npm run build -- --configuration production --base-href /Integradora/
   ```

3. Cambia `/Integradora/` por `/[TU-NOMBRE-REPOSITORIO]/`

   **Ejemplo:** Si tu repositorio se llama `hellhouse-web`:
   ```yaml
   run: npm run build -- --configuration production --base-href /hellhouse-web/
   ```

4. Guarda el archivo

5. Sube el cambio:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Ajustar base-href para GitHub Pages"
   git push origin main
   ```

---

## ✅ PASO 4: Hacer el primer despliegue

### Opción A: Despliegue automático (Recomendado)

1. **Haz un pequeño cambio** en cualquier archivo (o crea un archivo vacío)

2. **Sube el cambio:**
   ```bash
   git add .
   git commit -m "Trigger despliegue inicial"
   git push origin main
   ```

3. **El despliegue se iniciará automáticamente** 🎉

### Opción B: Despliegue manual

1. Ve a la pestaña **Actions** en tu repositorio

2. En la lista de workflows, busca **"Deploy to GitHub Pages"**

3. Click en **"Run workflow"** (botón a la derecha)

4. Selecciona la rama `main` (o `master`)

5. Click en **"Run workflow"** (botón verde)

---

## ✅ PASO 5: Verificar que el despliegue funcione

### 5.1 Ver el progreso en GitHub Actions

1. Ve a la pestaña **Actions** en tu repositorio

2. Click en el workflow **"Deploy to GitHub Pages"** que está ejecutándose

3. Verás 3 jobs ejecutándose en secuencia:
   - ⏳ **test** - Ejecutando pruebas
   - ⏳ **build** - Compilando la aplicación
   - ⏳ **deploy** - Desplegando a GitHub Pages

4. **Espera 6-10 minutos** hasta que todos los jobs estén en verde ✅

### 5.2 Verificar la URL de tu página

1. Ve a **Settings** → **Pages** en tu repositorio

2. Verás un mensaje: **"Your site is live at https://[usuario].github.io/Integradora/"**

3. **Copia esa URL**

### 5.3 Abrir tu página en el navegador

1. Abre la URL que copiaste en tu navegador

2. **Deberías ver tu aplicación Hell House Chronicles funcionando** 🎉

3. Si no carga, espera 1-2 minutos más (a veces tarda en propagarse)

---

## ✅ PASO 6: Obtener las evidencias (para tu trabajo)

### 6.1 Evidencia de pruebas automatizadas

1. Ve a **Actions** → **"Linting Tests"**

2. Selecciona la ejecución más reciente

3. **Captura de pantalla:** Toma una captura mostrando los 3 jobs en verde ✅

### 6.2 Evidencia de despliegue automatizado

1. Ve a **Actions** → **"Deploy to GitHub Pages"**

2. Selecciona la ejecución más reciente

3. **Captura de pantalla:** Toma una captura mostrando los 3 jobs (test, build, deploy) en verde ✅

4. **Captura adicional:** Toma una captura de Settings → Pages mostrando la URL

### 6.3 Evidencia de la página funcionando

1. Abre la URL de tu página en el navegador

2. **Captura de pantalla:** Toma una captura de la página cargando correctamente

### 6.4 (Opcional) Generar código QR

1. Ve a: https://www.qr-code-generator.com/

2. Pega la URL de tu página:
   ```
   https://[TU-USUARIO].github.io/Integradora/
   ```

3. Genera el código QR

4. Descarga la imagen

---

## ✅ PASO 7: Verificar que todo funcione correctamente

### Checklist final:

- [ ] GitHub Pages está configurado (Settings → Pages → Source: GitHub Actions)
- [ ] El workflow "Deploy to GitHub Pages" se ejecutó exitosamente
- [ ] Los 3 jobs (test, build, deploy) están en verde ✅
- [ ] La URL de la página aparece en Settings → Pages
- [ ] La página carga correctamente en el navegador
- [ ] Tienes las capturas de pantalla necesarias
- [ ] (Opcional) Tienes el código QR generado

---

## 🔧 Solución de Problemas Rápidos

### Problema: "No veo la opción GitHub Actions en Pages"

**Solución:**
- Asegúrate de que el archivo `.github/workflows/deploy.yml` esté en tu repositorio
- Haz push de todos los archivos
- Espera unos minutos y recarga

### Problema: "El workflow falla en 'test'"

**Solución:**
- Ejecuta localmente: `cd frontend && npm run lint:all`
- Corrige los errores que aparezcan
- Haz commit y push

### Problema: "El workflow falla en 'build'"

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs del job `build` en Actions
- Busca el error específico

### Problema: "La página no carga"

**Solución:**
- Verifica el `base-href` en el workflow (debe coincidir con el nombre del repo)
- Espera 2-3 minutos más (a veces tarda en propagarse)
- Verifica que el despliegue haya terminado (debe estar en verde)

### Problema: "Los assets (imágenes, CSS) no cargan"

**Solución:**
- El `base-href` está mal configurado
- Verifica que sea exactamente `/[NOMBRE-DE-TU-REPO]/`
- Vuelve a desplegar

---

## 📝 Resumen de Comandos

```bash
# 1. Subir archivos nuevos
git add .
git commit -m "Configurar despliegue a GitHub Pages"
git push origin main

# 2. Verificar estado
git status

# 3. Ver logs del workflow (después del push)
# Ve a GitHub → Actions para ver el progreso
```

---

## 🎯 Orden de Ejecución

1. ✅ **PASO 1:** Subir archivos a GitHub
2. ✅ **PASO 2:** Configurar GitHub Pages (Settings → Pages)
3. ✅ **PASO 3:** Ajustar base-href (solo si es necesario)
4. ✅ **PASO 4:** Hacer push o ejecutar workflow manualmente
5. ✅ **PASO 5:** Esperar y verificar el despliegue
6. ✅ **PASO 6:** Obtener evidencias (capturas de pantalla)
7. ✅ **PASO 7:** Verificar que todo funcione

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa los logs en Actions:**
   - Ve a Actions → Selecciona el workflow fallido
   - Click en el job que falló
   - Lee los logs para ver el error específico

2. **Consulta la documentación completa:**
   - `DEPLOY_GITHUB_PAGES.md` - Documentación detallada
   - `CONFIGURACION_GITHUB_PAGES.md` - Guía de configuración
   - `EVIDENCIAS_DESPLIEGUE.md` - Cómo obtener evidencias

---

**¡Listo!** Sigue estos pasos en orden y tu aplicación estará desplegada en GitHub Pages. 🚀

---

*Última actualización: Noviembre 2025*

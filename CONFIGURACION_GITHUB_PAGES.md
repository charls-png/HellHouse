# ⚙️ Guía de Configuración - GitHub Pages
## Pasos para Habilitar el Despliegue Automatizado

---

## 📋 Pasos Iniciales

### 1. Configurar GitHub Pages en el Repositorio

1. **Ve a tu repositorio en GitHub**
   - Navega a: `https://github.com/[TU-USUARIO]/Integradora`

2. **Abre Settings**
   - Click en la pestaña **Settings** (Configuración)

3. **Configura Pages**
   - En el menú lateral izquierdo, busca y click en **Pages**
   - En la sección **Source**, selecciona: **GitHub Actions**
   - **NO** selecciones "Deploy from a branch"
   - Guarda los cambios

4. **Verifica permisos**
   - Ve a **Settings** → **Actions** → **General**
   - Asegúrate de que "Workflow permissions" esté configurado como:
     - ✅ "Read and write permissions"
     - ✅ "Allow GitHub Actions to create and approve pull requests"

---

## 2. Verificar Archivos Necesarios

Asegúrate de que estos archivos existan en tu repositorio:

```
✅ .github/workflows/deploy.yml
✅ .github/workflows/lint.yml
✅ .htmlhintrc
✅ .stylelintrc.json
✅ frontend/package.json
✅ frontend/angular.json
```

---

## 3. Ajustar el Base Href (Si es necesario)

Si tu repositorio NO se llama "Integradora", debes actualizar el workflow:

1. Abre `.github/workflows/deploy.yml`
2. Busca la línea:
   ```yaml
   run: npm run build -- --configuration production --base-href /Integradora/
   ```
3. Cambia `/Integradora/` por `/[TU-NOMBRE-REPOSITORIO]/`

**Ejemplo:**
- Si tu repositorio se llama `hellhouse-web`:
  ```yaml
  run: npm run build -- --configuration production --base-href /hellhouse-web/
  ```

---

## 4. Configurar URL del Backend (Opcional)

Si tienes el backend desplegado en producción:

1. Abre `frontend/src/environments/environment.prod.ts`
2. Actualiza la URL del API:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://tu-backend-real.com/api'
   };
   ```

---

## 5. Hacer el Primer Despliegue

### Opción A: Push a la rama principal

```bash
git add .
git commit -m "Configurar despliegue a GitHub Pages"
git push origin main
```

### Opción B: Ejecución manual

1. Ve a **Actions** en tu repositorio
2. Selecciona **"Deploy to GitHub Pages"**
3. Click en **"Run workflow"**
4. Selecciona la rama `main` o `master`
5. Click en **"Run workflow"**

---

## 6. Verificar el Despliegue

### 6.1 Verificar en GitHub Actions

1. Ve a **Actions** en tu repositorio
2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
3. Espera a que termine (6-10 minutos)
4. Deberías ver:
   - ✅ test (verde)
   - ✅ build (verde)
   - ✅ deploy (verde)

### 6.2 Verificar la URL

1. Ve a **Settings** → **Pages**
2. Verás: **"Your site is live at https://[usuario].github.io/Integradora/"**
3. Abre esa URL en tu navegador
4. Deberías ver tu aplicación funcionando

---

## 7. Solución de Problemas

### Problema: "Workflow no aparece en Actions"

**Solución:**
- Verifica que el archivo esté en `.github/workflows/deploy.yml`
- Haz commit y push del archivo
- Refresca la página de Actions

### Problema: "Workflow falla en el paso 'test'"

**Solución:**
- Ejecuta localmente: `cd frontend && npm run lint:all`
- Corrige los errores reportados
- Haz commit y push

### Problema: "Workflow falla en el paso 'build'"

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Verifica que `angular.json` esté correcto
- Revisa los logs del job `build`

### Problema: "Workflow falla en el paso 'deploy'"

**Solución:**
- Verifica que GitHub Pages esté configurado (Settings → Pages)
- Verifica que el source sea "GitHub Actions"
- Verifica permisos del workflow

### Problema: "La página carga pero los assets no aparecen"

**Solución:**
- Verifica el `base-href` en el workflow
- Debe coincidir exactamente con el nombre del repositorio
- Ejemplo: Si el repo es `Integradora`, el base-href debe ser `/Integradora/`

---

## 8. Próximos Despliegues

Una vez configurado, los despliegues serán automáticos:

- ✅ Cada push a `main` o `master` desplegará automáticamente
- ✅ Las pruebas se ejecutan antes del despliegue
- ✅ Solo se despliega si las pruebas pasan

---

## 9. Enlaces Útiles

- **Documentación completa:** `DEPLOY_GITHUB_PAGES.md`
- **Resumen ejecutivo:** `RESUMEN_DESPLIEGUE.md`
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **GitHub Pages Docs:** https://docs.github.com/en/pages

---

**¡Listo!** 🎉 Tu aplicación se desplegará automáticamente a GitHub Pages.




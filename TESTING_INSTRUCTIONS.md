# Instrucciones para Probar el Sistema de Linting

## ✅ Instalación Completada

Las herramientas de linting ya están instaladas y configuradas. Ahora puedes probar el sistema.

## 🧪 Probar Linting Localmente

### Frontend (HTML + CSS)

```bash
cd frontend

# Probar linting de HTML
npm run lint:html

# Probar linting de CSS
npm run lint:css

# Probar ambos
npm run lint:all

# Corregir errores de CSS automáticamente (cuando sea posible)
npm run lint:fix
```

### Backend (JavaScript)

```bash
cd backend

# Probar linting de JavaScript
npm run lint

# Corregir errores automáticamente (cuando sea posible)
npm run lint:fix
```

## 🚀 Probar GitHub Actions

### Opción 1: Hacer Push al Repositorio

1. Haz commit de los cambios:
   ```bash
   git add .
   git commit -m "feat: Add linting automation with GitHub Actions"
   git push origin main
   ```

2. Ve a tu repositorio en GitHub
3. Ve a la pestaña **"Actions"**
4. Verás el workflow "Linting Tests" ejecutándose
5. Espera a que termine (tarda 2-3 minutos)
6. Verás los resultados:
   - ✅ Verde = Todos los checks pasaron
   - ❌ Rojo = Hay errores de linting

### Opción 2: Crear un Pull Request

1. Crea una nueva rama:
   ```bash
   git checkout -b test-linting
   ```

2. Haz un cambio pequeño (cualquier archivo)

3. Haz commit y push:
   ```bash
   git add .
   git commit -m "test: Test linting workflow"
   git push origin test-linting
   ```

4. En GitHub, crea un Pull Request desde `test-linting` a `main`
5. Los checks de linting se ejecutarán automáticamente
6. Verás los resultados en el PR

## 📊 Ver Resultados

### En GitHub Actions

1. Ve a: `https://github.com/[TU_USUARIO]/HellHouse/actions`
2. Haz clic en el workflow más reciente
3. Verás los jobs:
   - `lint-frontend` - Linting de HTML y CSS
   - `lint-backend` - Linting de JavaScript
   - `lint-all` - Reporte completo

### En Pull Requests

Los checks aparecen directamente en el PR:
- ✅ = Checks pasaron
- ❌ = Hay errores (haz clic para ver detalles)

## 🔧 Solución de Problemas

### Si hay errores de linting

1. **Ver errores localmente:**
   ```bash
   cd frontend
   npm run lint:all
   ```

2. **Corregir automáticamente (cuando sea posible):**
   ```bash
   npm run lint:fix
   ```

3. **Corregir manualmente:**
   - Lee los mensajes de error
   - Edita los archivos según las reglas
   - Vuelve a ejecutar el linting

### Si GitHub Actions falla

1. Haz clic en el workflow que falló
2. Revisa los logs de cada job
3. Los errores aparecerán en la sección de "Run linting"
4. Corrige los errores localmente
5. Haz push de nuevo

## 📝 Archivos de Configuración

Si necesitas ajustar las reglas de linting:

- **HTML**: Edita `.htmlhintrc` en la raíz del proyecto
- **CSS**: Edita `.stylelintrc.json` en la raíz del proyecto
- **JavaScript**: Edita `.eslintrc.json` en la raíz del proyecto

## ✅ Próximos Pasos

1. **Probar localmente**: Ejecuta `npm run lint:all` en frontend y `npm run lint` en backend
2. **Hacer push**: Sube los cambios a GitHub
3. **Verificar Actions**: Revisa que los workflows pasen
4. **Configurar Branch Protection** (opcional):
   - Ve a Settings → Branches
   - Agrega regla para `main`
   - Marca "Require status checks to pass before merging"
   - Selecciona `lint-frontend` y `lint-backend`

## 📚 Documentación Completa

Para más detalles, consulta:
- **[AUTOMATION_DOCUMENTATION.md](./AUTOMATION_DOCUMENTATION.md)** - Documentación completa
- **[LINTING_QUICKSTART.md](./LINTING_QUICKSTART.md)** - Guía rápida

---

**¡Listo!** Tu sistema de automatización de pruebas está configurado y funcionando. 🎉



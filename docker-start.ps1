# ==============================================================================
# Hell House - Script de inicio rápido con Docker
# ==============================================================================
# Este script facilita el inicio del proyecto Hell House con Docker Desktop
# Uso: .\docker-start.ps1

Write-Host ""
Write-Host "🏚️  =======================================" -ForegroundColor Red
Write-Host "   HELL HOUSE CHRONICLES" -ForegroundColor White
Write-Host "   Docker Quick Start" -ForegroundColor Gray
Write-Host "   =======================================" -ForegroundColor Red
Write-Host ""

# Verificar si Docker está corriendo
Write-Host "📋 Verificando Docker Desktop..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker Desktop no está corriendo" -ForegroundColor Red
    Write-Host "   Por favor inicia Docker Desktop y vuelve a ejecutar este script" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}
Write-Host "✅ Docker Desktop está corriendo" -ForegroundColor Green
Write-Host ""

# Verificar si existe docker-compose.yml
if (-Not (Test-Path "docker-compose.yml")) {
    Write-Host "❌ Error: No se encontró docker-compose.yml" -ForegroundColor Red
    Write-Host "   Asegúrate de estar en la raíz del proyecto" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

# Mostrar opciones
Write-Host "Selecciona una opción:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  [1] 🚀 Iniciar proyecto (primera vez / rebuild)" -ForegroundColor White
Write-Host "  [2] ▶️  Iniciar proyecto (normal)" -ForegroundColor White
Write-Host "  [3] ⏸️  Detener proyecto" -ForegroundColor White
Write-Host "  [4] 🔄 Reiniciar proyecto" -ForegroundColor White
Write-Host "  [5] 📊 Ver logs" -ForegroundColor White
Write-Host "  [6] 📈 Ver estado de servicios" -ForegroundColor White
Write-Host "  [7] 🗑️  Limpiar todo (¡CUIDADO! Borra la base de datos)" -ForegroundColor Red
Write-Host "  [8] ❌ Salir" -ForegroundColor Gray
Write-Host ""

$opcion = Read-Host "Opción"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "🏗️  Construyendo e iniciando servicios..." -ForegroundColor Yellow
        docker-compose up --build
    }
    "2" {
        Write-Host ""
        Write-Host "▶️  Iniciando servicios..." -ForegroundColor Yellow
        docker-compose up
    }
    "3" {
        Write-Host ""
        Write-Host "⏸️  Deteniendo servicios..." -ForegroundColor Yellow
        docker-compose down
        Write-Host ""
        Write-Host "✅ Servicios detenidos" -ForegroundColor Green
    }
    "4" {
        Write-Host ""
        Write-Host "🔄 Reiniciando servicios..." -ForegroundColor Yellow
        docker-compose restart
        Write-Host ""
        Write-Host "✅ Servicios reiniciados" -ForegroundColor Green
    }
    "5" {
        Write-Host ""
        Write-Host "📊 Mostrando logs (Ctrl+C para salir)..." -ForegroundColor Yellow
        docker-compose logs -f
    }
    "6" {
        Write-Host ""
        Write-Host "📈 Estado de servicios:" -ForegroundColor Yellow
        docker-compose ps
        Write-Host ""
        Write-Host "✨ Presiona cualquier tecla para continuar..." -ForegroundColor Gray
        pause
    }
    "7" {
        Write-Host ""
        Write-Host "⚠️  ADVERTENCIA: Esto eliminará TODOS los datos de la base de datos" -ForegroundColor Red
        $confirmacion = Read-Host "¿Estás seguro? (escribe 'SI' para confirmar)"
        if ($confirmacion -eq "SI") {
            Write-Host "🗑️  Eliminando contenedores y volúmenes..." -ForegroundColor Yellow
            docker-compose down -v
            Write-Host ""
            Write-Host "✅ Limpieza completada" -ForegroundColor Green
        } else {
            Write-Host "❌ Operación cancelada" -ForegroundColor Yellow
        }
    }
    "8" {
        Write-Host ""
        Write-Host "👋 Hasta luego..." -ForegroundColor Gray
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Opción no válida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✨ URLs de acceso:" -ForegroundColor Cyan
Write-Host "   🌐 Frontend:    http://localhost:4200" -ForegroundColor White
Write-Host "   🔌 Backend:     http://localhost:3000" -ForegroundColor White
Write-Host "   ❤️  Health Check: http://localhost:3000/health" -ForegroundColor White
Write-Host ""
Write-Host "📖 Para más información, lee DOCKER_README.md" -ForegroundColor Gray
Write-Host ""



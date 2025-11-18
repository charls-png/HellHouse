#!/bin/bash

# ==============================================================================
# Hell House - Script de inicio rápido con Docker
# ==============================================================================
# Este script facilita el inicio del proyecto Hell House con Docker Desktop
# Uso: ./docker-start.sh

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

echo ""
echo -e "${RED}🏚️  =======================================${NC}"
echo -e "${WHITE}   HELL HOUSE CHRONICLES${NC}"
echo -e "${GRAY}   Docker Quick Start${NC}"
echo -e "${RED}   =======================================${NC}"
echo ""

# Verificar si Docker está corriendo
echo -e "${YELLOW}📋 Verificando Docker...${NC}"
if ! docker ps >/dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker no está corriendo${NC}"
    echo -e "${YELLOW}   Por favor inicia Docker y vuelve a ejecutar este script${NC}"
    echo ""
    exit 1
fi
echo -e "${GREEN}✅ Docker está corriendo${NC}"
echo ""

# Verificar si existe docker-compose.yml
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Error: No se encontró docker-compose.yml${NC}"
    echo -e "${YELLOW}   Asegúrate de estar en la raíz del proyecto${NC}"
    echo ""
    exit 1
fi

# Mostrar opciones
echo -e "${CYAN}Selecciona una opción:${NC}"
echo ""
echo -e "${WHITE}  [1] 🚀 Iniciar proyecto (primera vez / rebuild)${NC}"
echo -e "${WHITE}  [2] ▶️  Iniciar proyecto (normal)${NC}"
echo -e "${WHITE}  [3] ⏸️  Detener proyecto${NC}"
echo -e "${WHITE}  [4] 🔄 Reiniciar proyecto${NC}"
echo -e "${WHITE}  [5] 📊 Ver logs${NC}"
echo -e "${WHITE}  [6] 📈 Ver estado de servicios${NC}"
echo -e "${RED}  [7] 🗑️  Limpiar todo (¡CUIDADO! Borra la base de datos)${NC}"
echo -e "${GRAY}  [8] ❌ Salir${NC}"
echo ""

read -p "Opción: " opcion

case $opcion in
    1)
        echo ""
        echo -e "${YELLOW}🏗️  Construyendo e iniciando servicios...${NC}"
        docker-compose up --build
        ;;
    2)
        echo ""
        echo -e "${YELLOW}▶️  Iniciando servicios...${NC}"
        docker-compose up
        ;;
    3)
        echo ""
        echo -e "${YELLOW}⏸️  Deteniendo servicios...${NC}"
        docker-compose down
        echo ""
        echo -e "${GREEN}✅ Servicios detenidos${NC}"
        ;;
    4)
        echo ""
        echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"
        docker-compose restart
        echo ""
        echo -e "${GREEN}✅ Servicios reiniciados${NC}"
        ;;
    5)
        echo ""
        echo -e "${YELLOW}📊 Mostrando logs (Ctrl+C para salir)...${NC}"
        docker-compose logs -f
        ;;
    6)
        echo ""
        echo -e "${YELLOW}📈 Estado de servicios:${NC}"
        docker-compose ps
        echo ""
        read -p "Presiona Enter para continuar..."
        ;;
    7)
        echo ""
        echo -e "${RED}⚠️  ADVERTENCIA: Esto eliminará TODOS los datos de la base de datos${NC}"
        read -p "¿Estás seguro? (escribe 'SI' para confirmar): " confirmacion
        if [ "$confirmacion" = "SI" ]; then
            echo -e "${YELLOW}🗑️  Eliminando contenedores y volúmenes...${NC}"
            docker-compose down -v
            echo ""
            echo -e "${GREEN}✅ Limpieza completada${NC}"
        else
            echo -e "${YELLOW}❌ Operación cancelada${NC}"
        fi
        ;;
    8)
        echo ""
        echo -e "${GRAY}👋 Hasta luego...${NC}"
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Opción no válida${NC}"
        ;;
esac

echo ""
echo -e "${CYAN}✨ URLs de acceso:${NC}"
echo -e "${WHITE}   🌐 Frontend:     http://localhost:4200${NC}"
echo -e "${WHITE}   🔌 Backend:      http://localhost:3000${NC}"
echo -e "${WHITE}   ❤️  Health Check: http://localhost:3000/health${NC}"
echo ""
echo -e "${GRAY}📖 Para más información, lee DOCKER_README.md${NC}"
echo ""



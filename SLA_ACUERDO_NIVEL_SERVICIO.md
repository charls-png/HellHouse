# ACUERDO DE NIVEL DE SERVICIO (SLA)
## Hell House Chronicles - Plataforma Web

---

**Documento:** SLA-2025-001  
**Versión:** 1.0  
**Fecha de Vigencia:** 1 de Enero de 2025  
**Fecha de Revisión:** 1 de Enero de 2026  
**Proveedor:** Hell House Development Team  
**Cliente:** Hell House Entertainment S.A. de C.V.

---

## 1. INFORMACIÓN GENERAL

### 1.1 Propósito del Documento

Este Acuerdo de Nivel de Servicio (SLA) establece los términos, condiciones y métricas de rendimiento acordados entre el Proveedor y el Cliente para la plataforma web **Hell House Chronicles**, una aplicación web informativa diseñada para promocionar un juego de terror inspirado en Hell House LLC.

### 1.2 Alcance del Servicio

El presente SLA cubre los siguientes servicios:

- **Frontend Web Application**: Aplicación Angular 18+ desplegada y accesible vía navegador web
- **Backend API REST**: Servicios API desarrollados en Node.js 18+ con Express
- **Base de Datos**: Sistema de gestión de base de datos PostgreSQL 16+
- **Sistema de Newsletter**: Funcionalidad de suscripción y envío de correos electrónicos
- **Sistema de Noticias**: Gestión y publicación de contenido de noticias
- **Infraestructura Docker**: Contenedores y orquestación de servicios

### 1.3 Definiciones

- **Tiempo de Actividad (Uptime)**: Porcentaje de tiempo que el servicio está disponible y operativo
- **Tiempo de Inactividad (Downtime)**: Período durante el cual el servicio no está disponible para los usuarios finales
- **Tiempo de Respuesta**: Tiempo transcurrido desde que se realiza una solicitud hasta que se recibe una respuesta
- **Incidente**: Cualquier evento que cause interrupción o degradación del servicio
- **Mantenimiento Programado**: Períodos de mantenimiento anunciados con anticipación
- **Mantenimiento No Programado**: Mantenimiento de emergencia no planificado

---

## 2. ESPECIFICACIONES TÉCNICAS DE LA APLICACIÓN

### 2.1 Arquitectura del Sistema

#### Frontend
- **Framework**: Angular 18+
- **Lenguaje**: TypeScript 5.7+
- **Estilos**: CSS3 (diseño custom, sin frameworks)
- **Librerías**: RxJS 7.8+
- **Servidor Web**: Nginx (modo producción)
- **Puerto**: 4200 (desarrollo) / 80 (producción)

#### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 4.18+
- **Lenguaje**: JavaScript (ES Modules)
- **Puerto**: 3000
- **Seguridad**: Helmet, CORS, Validación de inputs

#### Base de Datos
- **Sistema**: PostgreSQL 16+
- **Puerto**: 5432
- **Extensión**: UUID-OSSP
- **Tablas Principales**:
  - `subscribers` (suscriptores del newsletter)
  - `news` (noticias/actualizaciones)
  - `sent_emails` (historial de correos)
  - `page_visits` (analytics básico)

#### Infraestructura
- **Contenedores**: Docker & Docker Compose
- **Orquestación**: Docker Compose 3.8+
- **CI/CD**: GitHub Actions
- **Linting**: HTMLHint, Stylelint, ESLint

### 2.2 Endpoints de la API

#### Endpoints de Suscriptores
- `POST /api/subscribers/subscribe` - Suscribirse al newsletter
- `GET /api/subscribers/unsubscribe/:token` - Cancelar suscripción
- `GET /api/subscribers/stats` - Estadísticas de suscriptores

#### Endpoints de Noticias
- `GET /api/news` - Obtener todas las noticias
- `GET /api/news/latest?limit=5` - Obtener últimas noticias
- `GET /api/news/:id` - Obtener noticia por ID

#### Endpoints de Salud
- `GET /health` - Health check del sistema

### 2.3 Características Funcionales

1. **Sistema de Newsletter**
   - Suscripción con validación de email
   - Confirmación por correo electrónico
   - Cancelación de suscripción con token único
   - Historial de correos enviados

2. **Sistema de Noticias**
   - CRUD completo de noticias
   - Publicación programada
   - Filtrado y ordenamiento
   - Diseño tipo "documento clasificado"

3. **Diseño y UX**
   - Tema oscuro inspirado en Hell House LLC
   - Efectos de glitch y animaciones
   - Responsive design
   - Optimización de rendimiento

4. **Seguridad**
   - Validación de inputs
   - Headers de seguridad (Helmet)
   - Protección CSRF
   - Sanitización de datos

---

## 3. MÉTRICAS DE RENDIMIENTO Y DISPONIBILIDAD

### 3.1 Disponibilidad del Servicio

| Nivel de Servicio | Disponibilidad Mensual | Tiempo de Inactividad Permitido |
|-------------------|------------------------|--------------------------------|
| **Premium** | 99.9% | 43.2 minutos/mes |
| **Estándar** | 99.5% | 3.6 horas/mes |
| **Básico** | 99.0% | 7.2 horas/mes |

**Objetivo Acordado para Hell House Chronicles: 99.5% (Nivel Estándar)**

**Cálculo de Disponibilidad:**
```
Disponibilidad = ((Tiempo Total - Tiempo de Inactividad) / Tiempo Total) × 100
```

**Exclusiones:**
- Mantenimiento programado con 48 horas de anticipación
- Causas de fuerza mayor (desastres naturales, ataques DDoS masivos)
- Fallos de proveedores externos (servicios de email, CDN)
- Actualizaciones de seguridad críticas

### 3.2 Tiempos de Respuesta

#### Frontend (Página Web)
- **Tiempo de Carga Inicial**: ≤ 2 segundos (First Contentful Paint)
- **Tiempo de Carga Completa**: ≤ 4 segundos (Time to Interactive)
- **Tiempo de Navegación entre Páginas**: ≤ 500ms

#### Backend API
- **Health Check (`/health`)**: ≤ 100ms (p95)
- **GET `/api/news`**: ≤ 300ms (p95)
- **GET `/api/news/:id`**: ≤ 200ms (p95)
- **POST `/api/subscribers/subscribe`**: ≤ 500ms (p95)
- **GET `/api/subscribers/stats`**: ≤ 400ms (p95)

**Nota**: p95 = Percentil 95 (95% de las solicitudes deben cumplir este tiempo)

### 3.3 Capacidad y Escalabilidad

#### Capacidad Actual (Estimada)
- **Usuarios Concurrentes**: Hasta 1,000 usuarios simultáneos
- **Solicitudes por Segundo**: Hasta 500 req/s
- **Almacenamiento de Base de Datos**: 10 GB iniciales
- **Ancho de Banda**: 100 Mbps

#### Escalabilidad
- **Horizontal**: Sistema diseñado para escalamiento horizontal mediante Docker
- **Vertical**: Capacidad de aumentar recursos (CPU, RAM) según demanda
- **Base de Datos**: Configuración para replicación y backups automáticos

### 3.4 Rendimiento de Base de Datos

- **Tiempo de Consulta Promedio**: ≤ 50ms
- **Consultas Complejas**: ≤ 200ms
- **Tiempo de Conexión**: ≤ 100ms
- **Disponibilidad de Base de Datos**: 99.7%

---

## 4. TIEMPOS DE RESOLUCIÓN DE INCIDENTES

### 4.1 Clasificación de Incidentes

| Severidad | Descripción | Tiempo de Respuesta | Tiempo de Resolución |
|-----------|-------------|---------------------|----------------------|
| **Crítica (P1)** | Servicio completamente inactivo | 15 minutos | 2 horas |
| **Alta (P2)** | Funcionalidad principal degradada | 1 hora | 8 horas |
| **Media (P3)** | Funcionalidad secundaria afectada | 4 horas | 24 horas |
| **Baja (P4)** | Problemas menores, workaround disponible | 1 día laboral | 5 días laborales |

### 4.2 Definiciones de Severidad

**P1 - Crítica:**
- Aplicación completamente inaccesible
- Base de datos no responde
- Pérdida de datos
- Vulnerabilidad de seguridad crítica

**P2 - Alta:**
- Funcionalidad principal no disponible (newsletter, noticias)
- Rendimiento degradado significativo (>5 segundos de respuesta)
- Errores en >10% de las solicitudes

**P3 - Media:**
- Funcionalidad secundaria afectada
- Rendimiento ligeramente degradado (2-5 segundos)
- Errores esporádicos (<10% de solicitudes)

**P4 - Baja:**
- Problemas cosméticos
- Mejoras sugeridas
- Documentación incompleta

### 4.3 Canales de Soporte

- **Email**: support@hellhouse-chronicles.com
- **Sistema de Tickets**: https://support.hellhouse-chronicles.com
- **Horario de Soporte**: 24/7 para incidentes P1 y P2
- **Horario de Soporte Estándar**: Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-6)

---

## 5. MANTENIMIENTO Y ACTUALIZACIONES

### 5.1 Mantenimiento Programado

- **Frecuencia**: Máximo 1 vez por mes
- **Duración**: Máximo 4 horas por sesión
- **Horario Preferido**: Domingos, 2:00 AM - 6:00 AM (GMT-6)
- **Notificación**: Mínimo 48 horas de anticipación
- **Ventana de Mantenimiento**: No más de 4 horas consecutivas

### 5.2 Actualizaciones de Seguridad

- **Parches Críticos**: Aplicación inmediata (máximo 24 horas)
- **Parches Importantes**: Aplicación en la siguiente ventana de mantenimiento
- **Actualizaciones Regulares**: Según calendario de mantenimiento programado

### 5.3 Backups

- **Frecuencia de Backups**: Diarios (automáticos)
- **Retención**: 30 días
- **Backups Incrementales**: Cada 6 horas
- **Backups Completos**: Diarios a las 2:00 AM
- **Pruebas de Restauración**: Mensuales

---

## 6. MONITOREO Y REPORTES

### 6.1 Monitoreo Continuo

El sistema cuenta con monitoreo 24/7 de:

- Disponibilidad del servicio (uptime)
- Tiempos de respuesta de API
- Uso de recursos (CPU, memoria, disco)
- Errores y excepciones
- Tráfico de red
- Estado de la base de datos
- Health checks de todos los servicios

### 6.2 Herramientas de Monitoreo

- **Application Performance Monitoring (APM)**: Integrado
- **Logs Centralizados**: Sistema de logging en tiempo real
- **Alertas Automáticas**: Notificaciones por email/SMS para incidentes críticos
- **Dashboards**: Paneles de control en tiempo real

### 6.3 Reportes

#### Reportes Mensuales
El Proveedor entregará mensualmente un reporte que incluye:

- Disponibilidad del servicio (%)
- Tiempo de inactividad total
- Número y tipo de incidentes
- Tiempo promedio de resolución
- Métricas de rendimiento
- Estadísticas de uso
- Mejoras implementadas

**Fecha de Entrega**: Primeros 5 días hábiles del mes siguiente

---

## 7. PENALIZACIONES Y COMPENSACIONES

### 7.1 Penalizaciones por Incumplimiento

Si el Proveedor no cumple con los niveles de servicio acordados:

| Nivel de Incumplimiento | Disponibilidad Real | Compensación |
|-------------------------|----------------------|-------------|
| **Menor** | 99.0% - 99.4% | 5% de descuento en facturación mensual |
| **Moderado** | 98.0% - 98.9% | 10% de descuento en facturación mensual |
| **Severo** | 97.0% - 97.9% | 20% de descuento en facturación mensual |
| **Crítico** | < 97.0% | 50% de descuento + revisión del contrato |

### 7.2 Cálculo de Compensaciones

Las compensaciones se calcularán sobre la facturación mensual del servicio y se aplicarán como crédito en la siguiente facturación.

**Ejemplo:**
- Facturación Mensual: $10,000 MXN
- Disponibilidad Real: 98.5%
- Nivel Objetivo: 99.5%
- Incumplimiento: Moderado (10%)
- Compensación: $1,000 MXN de crédito

### 7.3 Exclusiones

No aplicarán compensaciones en caso de:

- Mantenimiento programado con notificación adecuada
- Causas de fuerza mayor
- Fallos de proveedores externos (email, CDN, DNS)
- Ataques DDoS masivos no mitigables
- Acciones del Cliente que causen interrupciones

---

## 8. SEGURIDAD Y PRIVACIDAD

### 8.1 Medidas de Seguridad

- **Encriptación**: HTTPS/TLS 1.3 para todas las comunicaciones
- **Autenticación**: Validación de tokens y sesiones
- **Protección de Datos**: Encriptación de datos sensibles en reposo
- **Firewall**: Configuración de firewall y reglas de acceso
- **Backups Seguros**: Backups encriptados y almacenados de forma segura

### 8.2 Privacidad de Datos

- **Cumplimiento**: RGPD (si aplica) y normativas locales
- **Retención de Datos**: Según políticas de privacidad acordadas
- **Acceso a Datos**: Solo personal autorizado
- **Auditorías**: Auditorías de seguridad anuales

### 8.3 Notificación de Brechas

En caso de brecha de seguridad:

- **Notificación Inmediata**: Dentro de 1 hora de detectada
- **Informe Detallado**: Dentro de 24 horas
- **Plan de Mitigación**: Implementación inmediata
- **Comunicación al Cliente**: Transparente y completa

---

## 9. ESCALAMIENTO Y RESOLUCIÓN DE DISPUTAS

### 9.1 Escalamiento

En caso de desacuerdos sobre el cumplimiento del SLA:

1. **Nivel 1**: Discusión directa entre equipos técnicos (48 horas)
2. **Nivel 2**: Escalamiento a gerentes de proyecto (1 semana)
3. **Nivel 3**: Revisión por comité directivo (2 semanas)
4. **Nivel 4**: Mediación o arbitraje (según contrato principal)

### 9.2 Revisión del SLA

Este SLA será revisado:

- **Anualmente**: Revisión completa del documento
- **Trimestralmente**: Revisión de métricas y ajustes si es necesario
- **Según necesidad**: Cambios significativos en el servicio o infraestructura

---

## 10. TÉRMINOS Y CONDICIONES ADICIONALES

### 10.1 Modificaciones al SLA

Cualquier modificación a este SLA debe ser:

- Acordada por ambas partes
- Documentada por escrito
- Firmada por representantes autorizados
- Comunicada con 30 días de anticipación

### 10.2 Fuerza Mayor

El Proveedor no será responsable por incumplimientos causados por:

- Desastres naturales
- Guerra, terrorismo, disturbios
- Fallos de infraestructura de terceros (electricidad, internet)
- Pandemias o emergencias de salud pública
- Cambios regulatorios o gubernamentales

### 10.3 Limitación de Responsabilidad

La responsabilidad máxima del Proveedor está limitada al monto total de facturación anual del servicio.

---

## 11. FIRMAS Y APROBACIONES

Este Acuerdo de Nivel de Servicio ha sido revisado y aprobado por:

**Proveedor:**
- Nombre: Hell House Development Team
- Representante: [Nombre del Representante]
- Firma: _________________________
- Fecha: _________________________

**Cliente:**
- Nombre: Hell House Entertainment S.A. de C.V.
- Representante: [Nombre del Representante]
- Firma: _________________________
- Fecha: _________________________

---

## 12. ANEXOS

### Anexo A: Métricas Detalladas de Rendimiento

**Métricas de Frontend:**
- Lighthouse Performance Score: ≥ 85
- First Contentful Paint: ≤ 1.5s
- Largest Contentful Paint: ≤ 2.5s
- Cumulative Layout Shift: ≤ 0.1
- Time to Interactive: ≤ 3.5s

**Métricas de Backend:**
- CPU Usage: ≤ 70% promedio
- Memory Usage: ≤ 80% promedio
- Disk I/O: ≤ 60% promedio
- Network Latency: ≤ 50ms promedio

### Anexo B: Procedimientos de Escalamiento

[Detalles de procedimientos específicos de escalamiento]

### Anexo C: Contactos de Emergencia

- **Soporte Técnico 24/7**: +52 (55) 1234-5678
- **Email de Emergencias**: emergency@hellhouse-chronicles.com
- **Gerente de Proyecto**: project-manager@hellhouse-chronicles.com

---

**Fin del Documento**

---

*Este documento es confidencial y está destinado únicamente para uso interno entre las partes involucradas.*


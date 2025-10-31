# 🎬 Ideas de Contenido para Hell House Chronicles

Guía para hacer tu página más aterradora e inmersiva, inspirada en Hell House LLC.

## 🖼️ Imágenes Recomendadas

### Ubicaciones sugeridas en `frontend/src/assets/images/`:

```
frontend/src/assets/images/
├── hero/
│   ├── hotel-exterior.jpg           # Fachada del hotel abandonado
│   └── hotel-entrance.jpg           # Entrada oscura
├── rooms/
│   ├── basement.jpg                 # Sótano (el más importante)
│   ├── hallway.jpg                  # Pasillo con puertas
│   ├── room-15.jpg                  # Habitación infame
│   └── ballroom.jpg                 # Salón de baile
├── clowns/                          # Inspirado en Hell House LLC
│   ├── clown-standing.jpg           # Payaso estático
│   ├── clown-closeup.jpg            # Primer plano inquietante
│   └── clown-corner.jpg             # En una esquina
├── found-footage/
│   ├── camera-view-1.jpg            # Estilo cámara de seguridad
│   ├── camera-view-2.jpg            # Vista nocturna
│   └── static-screen.jpg            # Pantalla con estática
└── atmospheric/
    ├── blood-stain.jpg              # Mancha de sangre
    ├── old-newspaper.jpg            # Recortes antiguos
    └── warning-sign.jpg             # Señales de advertencia
```

### 🎨 Estilo de Imágenes:

- **Colores**: Desaturadas, tonos sepia/grises
- **Calidad**: Ligeramente granuladas (estilo found footage)
- **Iluminación**: Oscura, con sombras dramáticas
- **Resolución**: 1920x1080 para hero, 800x600 para tarjetas

### 📸 Dónde encontrar imágenes:

- **Unsplash**: https://unsplash.com (busca: abandoned hotel, dark hallway)
- **Pexels**: https://www.pexels.com (busca: horror, creepy)
- **Pixabay**: https://pixabay.com (gratis, sin atribución)
- **Generadas con IA**: Midjourney, DALL-E, Stable Diffusion

### 🔧 Cómo agregar imágenes al proyecto:

```typescript
// En home.component.ts
export class HomeComponent {
  hotelImage = 'assets/images/hero/hotel-exterior.jpg';
  basementImage = 'assets/images/rooms/basement.jpg';
}
```

```html
<!-- En home.component.html -->
<section class="hero-section" [style.background-image]="'url(' + hotelImage + ')'">
  <!-- contenido -->
</section>
```

---

## 🔊 Audio Ambiental

### Ubicaciones sugeridas en `frontend/src/assets/audio/`:

```
frontend/src/assets/audio/
├── ambient/
│   ├── hotel-ambience.mp3           # Sonido ambiente del hotel
│   ├── wind-howling.mp3             # Viento aullando
│   ├── distant-screams.mp3          # Gritos distantes
│   └── footsteps-empty-hall.mp3     # Pasos en pasillo vacío
├── effects/
│   ├── door-creak.mp3               # Puerta rechinando
│   ├── static-noise.mp3             # Ruido de estática (TV/radio)
│   ├── heartbeat.mp3                # Latidos acelerados
│   └── whisper-unintelligible.mp3   # Susurros ininteligibles
└── music/
    ├── main-theme.mp3               # Tema principal (oscuro)
    └── tension-build.mp3            # Música de tensión
```

### 🎵 Dónde encontrar audio:

- **Freesound**: https://freesound.org (CC licensed)
- **Zapsplat**: https://www.zapsplat.com (free SFX)
- **YouTube Audio Library**: Música libre de copyright
- **Incompetech**: https://incompetech.com (música de Kevin MacLeod)

### 🔧 Implementar audio en Angular:

```typescript
// frontend/src/app/services/audio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  
  playAmbient(file: string, loop: boolean = true) {
    this.audio = new Audio(`assets/audio/${file}`);
    this.audio.loop = loop;
    this.audio.volume = 0.3; // Volumen bajo (30%)
    this.audio.play().catch(err => {
      console.log('Audio autoplay blocked:', err);
    });
  }
  
  playEffect(file: string) {
    const effect = new Audio(`assets/audio/${file}`);
    effect.volume = 0.5;
    effect.play();
  }
  
  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
```

```typescript
// Usar en home.component.ts
import { AudioService } from '../../services/audio.service';

export class HomeComponent {
  constructor(private audioService: AudioService) {}
  
  ngOnInit() {
    // Reproducir audio ambiente al cargar
    this.audioService.playAmbient('ambient/hotel-ambience.mp3');
  }
  
  onMouseEnter() {
    // Efecto de sonido al hover
    this.audioService.playEffect('effects/door-creak.mp3');
  }
}
```

---

## 📝 Contenido de Texto

### Noticias Adicionales (Agregar a la base de datos):

```sql
-- Noticia 1: Testimonios inquietantes
INSERT INTO news (title, content, excerpt, is_published, published_at) VALUES (
  'Testimonio de un Sobreviviente',
  'Alex Taylor, el único superviviente de aquella noche de 2009, rompió su silencio después de 15 años. En una entrevista exclusiva, reveló: "No eran maniquíes. Los payasos... se movían. Sé que suena loco, pero los vi. Uno de ellos me siguió hasta el sótano. Sus ojos... no eran humanos." Taylor fue encontrado en estado catatónico tres días después del incidente, vagando por las calles cercanas al hotel. Las autoridades descartaron su testimonio como "trauma post-traumático".',
  'El sobreviviente habla por primera vez...',
  TRUE,
  CURRENT_TIMESTAMP - INTERVAL '3 days'
);

-- Noticia 2: Investigación paranormal
INSERT INTO news (title, content, excerpt, is_published, published_at) VALUES (
  'Investigadores Detectan Anomalías',
  'Un equipo de investigadores paranormales equipado con medidores EMF y cámaras térmicas entró al hotel la semana pasada. Los resultados son perturbadores. El Dr. Marcus Webb reportó: "Las lecturas en el sótano son anormales. Detectamos fluctuaciones de temperatura de hasta 30 grados en segundos. Escuchamos voces en las grabaciones... diciendo nombres de personas que murieron allí hace décadas." El equipo se retiró prematuramente después de que uno de sus miembros sufrió un colapso nervioso.',
  'Lecturas EMF fuera de lo normal...',
  TRUE,
  CURRENT_TIMESTAMP - INTERVAL '7 days'
);

-- Noticia 3: Historia oculta
INSERT INTO news (title, content, excerpt, is_published, published_at) VALUES (
  'Documentos Secretos Revelados',
  'Archivos recientemente desclasificados revelan una historia oscura. En 1945, el hotel no sufrió un simple incendio. Según reportes policiales recuperados, 12 huéspedes fueron encontrados en el ala este, todos en sus habitaciones, con las puertas cerradas desde dentro. Las autopsias revelaron que murieron horas ANTES del incendio. Las causas de muerte fueron listadas como "desconocidas". ¿Qué sucedió realmente esa noche?',
  'El incendio de 1945 esconde un secreto...',
  TRUE,
  CURRENT_TIMESTAMP - INTERVAL '12 days'
);
```

### Emails del Newsletter:

Edita `backend/src/config/email.js` para agregar más templates:

```javascript
export const emailTemplates = {
  // ... templates existentes ...
  
  weeklyUpdate: (name, newsTitle, newsExcerpt) => ({
    subject: `🏚️ Actualización Semanal - ${newsTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="background: #0a0a0a; color: #cccccc; font-family: monospace;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8b0000;">ACTUALIZACIÓN SEMANAL</h1>
          <p>Estimado/a ${name},</p>
          <p>Han ocurrido nuevos eventos en el Hotel Abaddon...</p>
          <h2 style="color: #8b0000;">${newsTitle}</h2>
          <p>${newsExcerpt}</p>
          <a href="http://localhost:4200/#news" style="color: #8b0000;">
            Leer más en el sitio web →
          </a>
          <hr style="border-color: #3a0000; margin: 30px 0;">
          <p style="font-style: italic; color: #666;">
            "Las puertas están abiertas... ¿entrarás?"
          </p>
        </div>
      </body>
      </html>
    `
  }),
  
  warningAlert: (name) => ({
    subject: '⚠️ ADVERTENCIA URGENTE - No entres esta noche',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="background: #0a0a0a; color: #cccccc; font-family: monospace;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #8b0000;">
          <h1 style="color: #ff0000;">ADVERTENCIA</h1>
          <p>${name},</p>
          <p style="color: #ff6b6b; font-size: 16px;">
            Esta noche se han reportado actividades inusuales en el hotel. 
            El personal de seguridad ha evacuado el área.
          </p>
          <p>
            Si ves luces en las ventanas del tercer piso... no investigues.
          </p>
          <p style="margin-top: 40px; color: #8b0000;">
            La administración NO se hace responsable de lo que pueda suceder.
          </p>
        </div>
      </body>
      </html>
    `
  })
};
```

---

## 🎭 Efectos Visuales

### 1. Efecto de Parpadeo (Glitch)

```css
/* Agregar a styles.css */
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.flicker {
  animation: flicker 0.15s infinite;
}
```

### 2. Efecto de Sangre Goteando

```css
@keyframes drip {
  0% { height: 0; opacity: 1; }
  100% { height: 100px; opacity: 0; }
}

.blood-drip {
  position: absolute;
  width: 2px;
  background: #8b0000;
  animation: drip 3s ease-in infinite;
}
```

### 3. Hover Escalofriante

```css
.creepy-card:hover {
  transform: translateY(-4px) rotate(0.5deg);
  box-shadow: 0 8px 24px rgba(139, 0, 0, 0.6);
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><text y="20" font-size="20">☠️</text></svg>'), auto;
}
```

---

## 📱 Interactividad

### Easter Eggs (Huevos de Pascua):

```typescript
// En algún componente
@HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Lógica para detectar secuencia
  if (this.codeMatches(konamiCode)) {
    this.revealSecretContent();
  }
}
```

### Contador Regresivo:

```typescript
// Para generar hype
export class CountdownComponent {
  targetDate = new Date('2025-10-31T00:00:00'); // Halloween
  timeRemaining: string = '';
  
  ngOnInit() {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      this.timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
}
```

---

## 🌐 Redes Sociales

### Content Ideas para promoción:

1. **Twitter/X**:
   - "Día 1: Las puertas se abren. ¿Entrarás? #HellHouseChronicles"
   - "Encontramos esto en una cámara abandonada... [imagen]"
   - "Última advertencia: No bajen al sótano."

2. **Instagram**:
   - Fotos del hotel con filtros vintage
   - Stories con "Elige tu destino" (habitaciones)
   - Reels con audio ambiental

3. **TikTok**:
   - Tours virtuales del hotel
   - "POV: Eres el último en el Hotel Abaddon"
   - Behind the scenes del desarrollo

---

## 📊 Métricas de Terror

### Gamificación:

```typescript
interface UserProfile {
  braveryScore: number;      // Aumenta al explorar
  secretsFound: number;       // Easter eggs descubiertos
  nightsStayed: number;       // Visitas al sitio
  fearLevel: 'Nervioso' | 'Aterrado' | 'Valiente' | 'Temerario';
}
```

---

## 🎯 Roadmap de Contenido

### Fase 1 (Actual):
- ✅ Diseño base
- ✅ Newsletter funcional
- ✅ Noticias

### Fase 2 (Próxima):
- [ ] Agregar imágenes
- [ ] Audio ambiental
- [ ] Más noticias
- [ ] Gallery de "found footage"

### Fase 3 (Futuro):
- [ ] Modo "tour virtual" interactivo
- [ ] Minijuego de escape room
- [ ] Sistema de usuarios y perfiles
- [ ] Chat en vivo "haunted"

---

¡Usa estas ideas para hacer tu proyecto único y aterrador! 🏚️👻



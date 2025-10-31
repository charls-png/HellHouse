import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorrorService {
  showJumpscare$ = new BehaviorSubject<boolean>(false);

  // Imágenes de rostros
  private faceImages = [
    'rostro1.png',
    'rostro2.png',
    'rostro3.png',
    'rostro4.png'
  ];

  // Sonidos aleatorios (excluyendo jumpscare.mp4 y sonido fondo.mpeg)
  private randomSounds = [
    'grito.mp4',
    'sonidoraro.mp4',
    'risa1.mpeg'
  ];

  private imageInterval?: number;
  private soundInterval?: number;

  constructor() {}

  // Activar jumpscare
  triggerJumpscare() {
    this.showJumpscare$.next(true);

    // Reproducir sonido de jumpscare
    const jumpscareSound = new Audio('/assets/audio/jumpscare.mp4');
    jumpscareSound.volume = 0.7;
    jumpscareSound.play().catch(err => console.error('Error al reproducir jumpscare:', err));

    // Ocultar después de 1 segundo
    setTimeout(() => {
      this.showJumpscare$.next(false);
    }, 1000);
  }

  // Iniciar efectos aleatorios
  startRandomEffects() {
    // Imágenes cada 10-15 segundos
    this.startRandomImages();

    // Sonidos cada 8-14 segundos
    this.startRandomSounds();
  }

  // Detener efectos aleatorios
  stopRandomEffects() {
    if (this.imageInterval) {
      clearTimeout(this.imageInterval);
    }
    if (this.soundInterval) {
      clearTimeout(this.soundInterval);
    }
  }

  private startRandomImages() {
    const showRandomImage = () => {
      const randomImage = this.faceImages[Math.floor(Math.random() * this.faceImages.length)];
      const imagePath = `/assets/images/${randomImage}`;

      // Crear overlay temporal con posición aleatoria
      const overlay = document.createElement('div');
      overlay.className = 'random-image-overlay';

      // Posición aleatoria en el viewport visible
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const imageSize = 180; // tamaño de la imagen

      // Decidir si aparece a la izquierda o derecha
      const side = Math.random() > 0.5 ? 'right' : 'left';

      let randomX: number;
      if (side === 'left') {
        // Lado izquierdo (20px desde el borde)
        randomX = 20 + Math.random() * 30;
      } else {
        // Lado derecho
        randomX = viewportWidth - imageSize - 20 - Math.random() * 30;
      }

      // Posición vertical aleatoria en el área visible + scroll
      const randomY = scrollY + 100 + Math.random() * (viewportHeight - 250); // margen superior e inferior

      overlay.style.left = `${randomX}px`;
      overlay.style.top = `${randomY}px`;

      overlay.innerHTML = `<img src="${imagePath}" alt="Rostro" class="random-face-image">`;
      document.body.appendChild(overlay);

      // Remover después de 2-3 segundos
      const displayTime = 2000 + Math.random() * 1000; // 2-3 segundos
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 500);
      }, displayTime);

      // Programar siguiente imagen (10-15 segundos)
      const nextDelay = 10000 + Math.random() * 5000; // 10-15 segundos
      this.imageInterval = window.setTimeout(showRandomImage, nextDelay);
    };

    // Primera imagen después de 10-15 segundos
    const firstDelay = 10000 + Math.random() * 5000;
    this.imageInterval = window.setTimeout(showRandomImage, firstDelay);
  }

  private startRandomSounds() {
    const playRandomSound = () => {
      const randomSound = this.randomSounds[Math.floor(Math.random() * this.randomSounds.length)];
      const soundPath = `/assets/audio/${randomSound}`;

      const audio = new Audio(soundPath);
      audio.volume = 0.5; // Volumen moderado, por encima del fondo
      audio.play().catch(err => console.error('Error al reproducir sonido aleatorio:', err));

      // Programar siguiente sonido (8-14 segundos)
      const nextDelay = 8000 + Math.random() * 6000; // 8-14 segundos
      this.soundInterval = window.setTimeout(playRandomSound, nextDelay);
    };

    // Primer sonido después de 8-14 segundos
    const firstDelay = 8000 + Math.random() * 6000;
    this.soundInterval = window.setTimeout(playRandomSound, firstDelay);
  }
}


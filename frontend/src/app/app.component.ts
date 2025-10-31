import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HorrorService } from './services/horror.service';
import { DeteriorationService } from './services/deterioration.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Hell House';
  private backgroundAudio?: HTMLAudioElement;
  private audioStarted = false;

  constructor(
    private horrorService: HorrorService,
    private deteriorationService: DeteriorationService
  ) {}

  ngOnInit() {
    // Iniciar audio de fondo al cargar la página
    this.backgroundAudio = new Audio('/assets/audio/sonido fondo.mpeg');
    this.backgroundAudio.loop = true;
    this.backgroundAudio.volume = 0.3; // Volumen al 30%

    // Intentar reproducir (algunos navegadores requieren interacción del usuario)
    this.backgroundAudio.play().catch(() => {
      // Si falla por autoplay policy, se reproducirá con la primera interacción
      this.startAudioOnInteraction();
    });

    // También intentar iniciar con cualquier interacción del usuario
    this.startAudioOnInteraction();

    // Iniciar efectos aleatorios de terror
    this.horrorService.startRandomEffects();
  }

  private startAudioOnInteraction() {
    if (this.audioStarted || !this.backgroundAudio) return;

    const startAudio = () => {
      if (!this.audioStarted && this.backgroundAudio) {
        this.backgroundAudio.play().then(() => {
          this.audioStarted = true;
        }).catch(() => {
          // Silenciosamente fallar si aún no se puede reproducir
        });
      }
    };

    // Escuchar múltiples eventos de interacción
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });
  }

  ngOnDestroy() {
    // Detener audio al destruir el componente
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
      this.backgroundAudio = undefined;
    }

    // Detener efectos aleatorios
    this.horrorService.stopRandomEffects();

    // Detener servicio de deterioro
    this.deteriorationService.destroy();
  }
}
